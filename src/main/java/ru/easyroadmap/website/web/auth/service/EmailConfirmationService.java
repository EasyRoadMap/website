package ru.easyroadmap.website.web.auth.service;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.model.auth.EmailConfirmation;
import ru.easyroadmap.website.storage.repository.auth.EmailConfirmationRepository;
import ru.easyroadmap.website.util.CharSequenceGenerator;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static ru.easyroadmap.website.web.auth.service.EmailConfirmationService.ProofKeyConsumer.PROOF_KEY_COOKIE_NAME;

@Log4j2
@Service
@RequiredArgsConstructor
public final class EmailConfirmationService {

    private static final ExecutorService MAIL_SENDING_TASKS_POOL = Executors.newVirtualThreadPerTaskExecutor();

    private final EmailConfirmationRepository emailConfirmationRepository;
    private final MailService mailService;

    public void requestEmailConfirmation(
            String email,
            boolean renew,
            String mailTitle,
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
        sendCodeViaEmail(email, mailTitle, mailContentFormatter.formatContent(code.toUpperCase()));

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

    private void sendCodeViaEmail(String email, String title, String content) {
        MAIL_SENDING_TASKS_POOL.submit(() -> {
            try {
                log.debug("Sending code to '{}' via email...", email);
                mailService.sendMail(email, title, content);
                log.info("An email confirmation code has been sent to '{}'.", email);
            } catch (MessagingException | UnsupportedEncodingException ex) {
                log.error("Unable to send a code via email!", ex);
            }
        });
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
