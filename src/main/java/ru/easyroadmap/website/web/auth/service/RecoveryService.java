package ru.easyroadmap.website.web.auth.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.auth.RecoveryRequest;
import ru.easyroadmap.website.storage.repository.UserRepository;
import ru.easyroadmap.website.storage.repository.auth.RecoveryRequestRepository;
import ru.easyroadmap.website.util.CharSequenceGenerator;

import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public final class RecoveryService {

    public static final String PROOF_KEY_COOKIE_NAME = "RECOVERY_PROOF_KEY";
    public static final int PROOF_KEY_COOKIE_MAX_AGE = 300;

    private final RecoveryRequestRepository recoveryRequestRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final MailService mailService;

    public String processRecoveryCodeRequest(String email) throws GenericErrorException {
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty())
            throw new GenericErrorException(
                    "user_not_found",
                    "User not found"
            );

        Optional<RecoveryRequest> existing = recoveryRequestRepository.findById(email);
        if (existing.isPresent() && !existing.get().isExpired())
            throw new GenericErrorException(
                    "recovery_pending",
                    "This account already has a pending recovery request"
            );

        if (existing.isPresent() && existing.get().isConfirmed())
            throw new GenericErrorException(
                    "recovery_already_confirmed",
                    "This account already has a confirmed recovery request"
            );

        String code = CharSequenceGenerator.generateRandomDigitsCode(6);
        sendRecoveryCode(email, user.get().getName(), code);

        String proofKey = CharSequenceGenerator.generateProofKey();

        RecoveryRequest request;
        if (existing.isPresent()) {
            request = existing.get();
            request.renew(code, proofKey);
        } else {
            request = new RecoveryRequest(email, code, proofKey);
        }

        recoveryRequestRepository.save(request);
        log.info("Requested recovery for '{}'.", email);
        return proofKey;
    }

    public void processRecoveryConfirmation(String email, String code, String proofKey) throws GenericErrorException {
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty())
            throw new GenericErrorException(
                    "user_not_found",
                    "User not found"
            );

        Optional<RecoveryRequest> request = recoveryRequestRepository.findById(email);
        if (request.isEmpty())
            throw new GenericErrorException(
                    "request_not_found",
                    "A recovery wasn't requested for this account"
            );

        if (!request.get().getProofKey().equalsIgnoreCase(proofKey))
            throw new GenericErrorException(
                    "wrong_proof_key",
                    "Your proof key isn't correct"
            );

        if (request.get().isExpired())
            throw new GenericErrorException(
                    "request_expired",
                    "The recovery request is expired"
            );

        if (request.get().hasNoMoreAttempts())
            throw new GenericErrorException(
                    "no_more_attempts",
                    "You have no more attempts to confirm this recovery request"
            );

        String correctCode = request.get().getCode();
        try {
            if (correctCode != null && !correctCode.equalsIgnoreCase(code)) {
                request.get().decreaseAttemptsCounter();
                log.info(
                        "Recovery confirmation failed for '{}' (wrong code, attempts left: {})",
                        email, request.get().getAttemptsLeft()
                );

                throw new GenericErrorException(
                        "wrong_code",
                        "Your code doesn't match with the correct"
                );
            } else {
                request.get().setConfirmed(true);
                log.info("Recovery request for '{}' has been confirmed.", email);
            }
        } finally {
            recoveryRequestRepository.save(request.get());
        }
    }

    public User performRecovery(String email, String password, String proofKey) throws GenericErrorException {
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty())
            throw new GenericErrorException(
                    "user_not_found",
                    "User not found"
            );

        Optional<RecoveryRequest> request = recoveryRequestRepository.findById(email);
        if (request.isEmpty() || !request.get().isConfirmed())
            throw new GenericErrorException(
                    "request_not_confirmed",
                    "A recovery is not confirmed for this account"
            );

        if (!request.get().getProofKey().equalsIgnoreCase(proofKey))
            throw new GenericErrorException(
                    "wrong_proof_key",
                    "Your proof key isn't correct"
            );

        String encodedPassword = passwordEncoder.encode(password);
        user.get().setPassword(encodedPassword);
        userRepository.save(user.get());

        request.ifPresent(recoveryRequestRepository::delete);

        log.info("Password has been changed for user '{}'.", email);
        return user.get();
    }

    private void sendRecoveryCode(String email, String name, String code) throws GenericErrorException {
        String content = """
                Hello, dear {0}!<br>
                Here is your recovery code:<br>
                <h3>{1}</h3>
                """;

        try {
            mailService.sendMail(email, "EasyRoadMap - Account recovery", MessageFormat.format(content, name, code));
        } catch (MessagingException | UnsupportedEncodingException ex) {
            throw new GenericErrorException(ex);
        }
    }

}
