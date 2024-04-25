package ru.easyroadmap.website.web.auth.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.service.MailService;
import ru.easyroadmap.website.storage.model.auth.EmailConfirmation;
import ru.easyroadmap.website.storage.repository.auth.EmailConfirmationRepository;
import ru.easyroadmap.website.util.CharSequenceGenerator;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.apache.commons.io.IOUtils.closeQuietly;
import static ru.easyroadmap.website.web.auth.service.EmailConfirmationService.ProofKeyConsumer.PROOF_KEY_COOKIE_NAME;

@Slf4j
@Service
@RequiredArgsConstructor
public final class EmailConfirmationService {

    private final EmailConfirmationRepository emailConfirmationRepository;
    private final MailService mailService;

    public void requestEmailConfirmation(
            String email,
            boolean renew,
            String mailTitle,
            String mailSubtitle,
            String userName,
            MailContentFormatter mailContentFormatter,
            ProofKeyConsumer proofKeyConsumer
    ) throws GenericErrorException {
        Optional<EmailConfirmation> existing = emailConfirmationRepository.findById(email);
        if (existing.isPresent()) {
            if (existing.get().isConfirmed()) {
                throw new GenericErrorException(
                        "email_already_confirmed",
                        "This email is already confirmed"
                );
            }

            if (renew) {
                if (!existing.get().canBeRenewed()) {
                    throw new GenericErrorException(
                            "email_confirmation_unrenewable",
                            "This email already has a pending confirmation request that cannot be renewed yet"
                    );
                }
            } else {
                if (!existing.get().isExpired()) {
                    throw new GenericErrorException(
                            "email_confirmation_pending",
                            "This email already has a pending confirmation request"
                    );
                }
            }
        }

        String code = CharSequenceGenerator.generateRandomAlphanumericString(6, false);

        InputStream resource = getClass().getResourceAsStream("/templates/mail/confirmation.html");
        BufferedReader reader = new BufferedReader(new InputStreamReader(resource, StandardCharsets.UTF_8));
        String html = reader.lines().map(String::trim).collect(Collectors.joining("\n"));
        closeQuietly(reader);

        html = html.replace("{{code}}", code.toUpperCase())
                .replace("{{user}}", userName)
                .replace("{{subtitle}}", mailSubtitle);

        mailService.sendMailAsync(email, mailTitle, mailContentFormatter.formatContent(code.toUpperCase()), html);

        String proofKey = CharSequenceGenerator.generateProofKey();
        EmailConfirmation confirmation = existing.orElseGet(() -> new EmailConfirmation(email));
        confirmation.renew(code, proofKey);
        emailConfirmationRepository.save(confirmation);

        proofKeyConsumer.accept(proofKey);
        log.info("Requested email confirmation for '{}'.", email);
    }

    public void processEmailConfirmation(String email, String code, String proofKey) throws GenericErrorException {
        Optional<EmailConfirmation> confirmation = emailConfirmationRepository.findById(email);
        if (confirmation.isEmpty()) {
            throw new GenericErrorException(
                    "request_not_found",
                    "A confirmation wasn't requested for this email"
            );
        }

        if (confirmation.get().isExpired()) {
            throw new GenericErrorException(
                    "request_expired",
                    "The confirmation request is expired"
            );
        }

        if (!confirmation.get().getProofKey().equalsIgnoreCase(proofKey)) {
            throw new GenericErrorException(
                    "wrong_proof_key",
                    "Your proof key isn't correct"
            );
        }

        if (confirmation.get().hasNoMoreAttempts()) {
            throw new GenericErrorException(
                    "no_more_attempts",
                    "You have no more attempts to confirm this email"
            );
        }

        try {
            String correctCode = confirmation.get().getCode();
            if (correctCode != null && correctCode.equalsIgnoreCase(code)) {
                confirmation.get().setConfirmed(true);
                log.info("Email '{}' has been confirmed.", email);
            } else {
                confirmation.get().decreaseAttemptsCounter();

                log.info(
                        "Email confirmation failed for '{}' (wrong code, attempts left: {})",
                        email, confirmation.get().getAttemptsLeft()
                );

                throw new GenericErrorException(
                        "wrong_code",
                        "Your code doesn't match with the correct"
                );
            }
        } finally {
            emailConfirmationRepository.save(confirmation.get());
        }
    }

    public void validateEmailConfirmation(String email, String proofKey) throws GenericErrorException {
        Optional<EmailConfirmation> confirmation = emailConfirmationRepository.findById(email);
        if (confirmation.isEmpty() || !confirmation.get().isConfirmed()) {
            throw new GenericErrorException(
                    "email_not_confirmed",
                    "This operation requires an email confirmation"
            );
        }

        if (!confirmation.get().getProofKey().equals(proofKey)) {
            throw new GenericErrorException(
                    "wrong_proof_key",
                    "Your proof key isn't correct"
            );
        }
    }

    public void forgetEmailConfirmation(String email) {
        emailConfirmationRepository.deleteById(email);
    }

    public static String extractProofKey(HttpServletRequest request) throws GenericErrorException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null)
            for (Cookie cookie : cookies)
                if (PROOF_KEY_COOKIE_NAME.equals(cookie.getName()))
                    return cookie.getValue();

        throw new GenericErrorException(
                "wrong_proof_key",
                "Your proof key isn't correct"
        );
    }

    public static void forgetProofKey(HttpServletResponse response) {
        Cookie cookie = new Cookie(PROOF_KEY_COOKIE_NAME, "");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    @FunctionalInterface
    public interface MailContentFormatter {

        String formatContent(String code);

    }

    @FunctionalInterface
    public interface ProofKeyConsumer {

        String PROOF_KEY_COOKIE_NAME = "ERM_PROOF_KEY";
        int PROOF_KEY_COOKIE_MAX_AGE = 600;

        static ProofKeyConsumer cookieBased(HttpServletResponse response) {
            return proofKey -> {
                Cookie cookie = new Cookie(PROOF_KEY_COOKIE_NAME, proofKey);
                cookie.setMaxAge(PROOF_KEY_COOKIE_MAX_AGE);
                response.addCookie(cookie);
            };
        }

        void accept(String proofKey);

    }

}
