package ru.easyroadmap.website.web.auth.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.web.auth.dto.SignUpCompleteDto;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.auth.EmailConfirmation;
import ru.easyroadmap.website.storage.repository.UserRepository;
import ru.easyroadmap.website.storage.repository.auth.EmailConfirmationRepository;
import ru.easyroadmap.website.util.CharSequenceGenerator;

import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public final class RegistrationService {

    private final EmailConfirmationRepository emailConfirmationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final MailService mailService;

    public User registerNewUser(SignUpCompleteDto userDto) throws GenericErrorException {
        String email = userDto.getEmail();

        Optional<User> existing = userRepository.findById(email);
        if (existing.isPresent())
            throw new GenericErrorException(
                    "user_already_exists",
                    "An user with same email address is already registered"
            );

        Optional<EmailConfirmation> confirmation = emailConfirmationRepository.findById(email);
        if (confirmation.isEmpty() || !confirmation.get().isConfirmed())
            throw new GenericErrorException(
                    "email_not_confirmed",
                    "This email address is not confirmed"
            );

        String rawPassword = userDto.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);

        User user = new User(email, encodedPassword, userDto.getName());
        userRepository.save(user);

        confirmation.ifPresent(emailConfirmationRepository::delete);

        log.info("Registered a new user '{}'.", email);
        return user;
    }

    public void processEmailCodeRequest(String email, String name) throws GenericErrorException {
        if (isEmailUsed(email))
            throw new GenericErrorException(
                    "email_already_used",
                    "This email is already used by other account"
            );

        Optional<EmailConfirmation> existing = emailConfirmationRepository.findById(email);
        if (existing.isPresent() && !existing.get().isExpired())
            throw new GenericErrorException(
                    "email_confirmation_pending",
                    "This email already has a pending confirmation request"
            );

        if (existing.isPresent() && existing.get().isConfirmed())
            throw new GenericErrorException(
                    "email_already_confirmed",
                    "This email is already confirmed"
            );

        String code = CharSequenceGenerator.generateRandomDigitsCode(6);
        sendConfirmationCode(email, name, code);

        EmailConfirmation confirmation;
        if (existing.isPresent()) {
            confirmation = existing.get();
            confirmation.renew(code);
        } else {
            confirmation = new EmailConfirmation(email, code);
        }

        emailConfirmationRepository.save(confirmation);
        log.info("Requested email confirmation for '{}'.", email);
    }

    public void processEmailConfirmation(String email, String code) throws GenericErrorException {
        Optional<EmailConfirmation> confirmation = emailConfirmationRepository.findById(email);
        if (confirmation.isEmpty())
            throw new GenericErrorException(
                    "request_not_found",
                    "A confirmation wasn't requested for this email"
            );

        if (confirmation.get().isExpired())
            throw new GenericErrorException(
                    "request_expired",
                    "The confirmation request is expired"
            );

        if (confirmation.get().hasNoMoreAttempts())
            throw new GenericErrorException(
                    "no_more_attempts",
                    "You have no more attempts to confirm this email"
            );

        String correctCode = confirmation.get().getCode();
        try {
            if (correctCode != null && !correctCode.equalsIgnoreCase(code)) {
                confirmation.get().decreaseAttemptsCounter();
                log.info(
                        "Email confirmation failed for '{}' (wrong code, attempts left: {})",
                        email, confirmation.get().getAttemptsLeft()
                );

                throw new GenericErrorException(
                        "wrong_code",
                        "Your code doesn't match with the correct"
                );
            } else {
                confirmation.get().setConfirmed(true);
                log.info("Email '{}' has been confirmed.", email);
            }
        } finally {
            emailConfirmationRepository.save(confirmation.get());
        }
    }

    public boolean isEmailUsed(String email) {
        return userRepository.existsById(email);
    }

    private void sendConfirmationCode(String email, String name, String code) throws GenericErrorException {
        String content = """
                Hello, dear {0}!<br>
                Here is your confirmation code:<br>
                <h3>{1}</h3>
                """;

        try {
            mailService.sendMail(email, "EasyRoadMap - Your confirmation code", MessageFormat.format(content, name, code));
        } catch (MessagingException | UnsupportedEncodingException ex) {
            throw new GenericErrorException(ex);
        }
    }

}
