package ru.easyroadmap.website.web.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.repository.UserRepository;
import ru.easyroadmap.website.web.auth.service.EmailConfirmationService.ProofKeyConsumer;

import java.text.MessageFormat;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public final class RecoveryService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailConfirmationService confirmationService;

    public void performRecovery(String email, String password, String proofKey) throws GenericErrorException {
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty())
            throw new GenericErrorException(
                    "user_not_found",
                    "User not found"
            );

        confirmationService.validateEmailConfirmation(email, proofKey);

        String encodedPassword = passwordEncoder.encode(password);
        user.get().setPassword(encodedPassword);

        userRepository.save(user.get());
        confirmationService.forgetEmailConfirmation(email);

        log.info("A password has been changed for user '{}'.", email);
    }

    public void processConfirmationRequest(String email, boolean renew, ProofKeyConsumer proofKeyConsumer) throws GenericErrorException {
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty())
            throw new GenericErrorException(
                    "user_not_found",
                    "User not found"
            );

        confirmationService.requestEmailConfirmation(
                email,
                renew,
                "EasyRoadMap - Account recovery",
                code -> MessageFormat.format("""
                        Hello, dear {0}!<br>
                        Here is your recovery code:<br>
                        <h3>{1}</h3>
                        """, user.get().getName(), code),
                proofKeyConsumer
        );
    }

    public void processEmailConfirmation(String email, String code, String proofKey) throws GenericErrorException {
        Optional<User> user = userRepository.findById(email);
        if (user.isEmpty())
            throw new GenericErrorException(
                    "user_not_found",
                    "User not found"
            );

        confirmationService.processEmailConfirmation(email, code, proofKey);
    }

}
