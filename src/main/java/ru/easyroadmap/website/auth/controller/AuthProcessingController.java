package ru.easyroadmap.website.auth.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.auth.dto.*;
import ru.easyroadmap.website.auth.service.RecoveryService;
import ru.easyroadmap.website.auth.service.RegistrationService;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.model.User;

import static ru.easyroadmap.website.auth.service.RecoveryService.PROOF_KEY_COOKIE_MAX_AGE;
import static ru.easyroadmap.website.auth.service.RecoveryService.PROOF_KEY_COOKIE_NAME;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public final class AuthProcessingController {

    private final RegistrationService registrationService;
    private final RecoveryService recoveryService;
    private final Validator validator;

    @PostMapping(value = "/sign-up", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void processSignUp(
            @RequestBody MultiValueMap<String, String> formData,
            HttpServletResponse response
    ) throws GenericErrorException {
        UserDto userDto = UserDto.fromFormData(formData);
        GenericErrorException.throwIfViolationsFound(validator, userDto);

        User user = registrationService.registerNewUser(userDto);

        response.setHeader("Location", "/auth/sign-in");
        response.setStatus(308);
    }

    @PostMapping(value = "/sign-up/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processEmailCodeRequest(
            @RequestBody MultiValueMap<String, String> formData
    ) throws GenericErrorException {
        EmailCodeRequestDto requestDto = EmailCodeRequestDto.fromFormData(formData);
        GenericErrorException.throwIfViolationsFound(validator, requestDto);

        String email = requestDto.getEmail();
        String name = requestDto.getName();

        registrationService.processEmailCodeRequest(email, name);
    }

    @PostMapping(value = "/sign-up/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processEmailConfirmation(@RequestBody MultiValueMap<String, String> formData) throws GenericErrorException {
        EmailConfirmationDto confirmationDto = EmailConfirmationDto.fromFormData(formData);
        GenericErrorException.throwIfViolationsFound(validator, confirmationDto);

        String email = confirmationDto.getEmail();
        String code = confirmationDto.getCode();

        registrationService.processEmailConfirmation(email, code);
    }

    @PostMapping(value = "/recovery/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryCodeRequest(
            @RequestBody MultiValueMap<String, String> formData,
            HttpServletResponse response
    ) throws GenericErrorException {
        RecoveryCodeRequestDto requestDto = RecoveryCodeRequestDto.fromFormData(formData);
        GenericErrorException.throwIfViolationsFound(validator, requestDto);

        String email = requestDto.getEmail();
        String proofKey = recoveryService.processRecoveryCodeRequest(email);

        Cookie cookie = new Cookie(PROOF_KEY_COOKIE_NAME, proofKey);
        cookie.setMaxAge(PROOF_KEY_COOKIE_MAX_AGE);
        response.addCookie(cookie);
    }

    @PostMapping(value = "/recovery/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryConfirmation(
            @RequestBody MultiValueMap<String, String> formData,
            HttpServletRequest request
    ) throws GenericErrorException {
        RecoveryConfirmationDto confirmationDto = RecoveryConfirmationDto.fromFormData(formData);
        GenericErrorException.throwIfViolationsFound(validator, confirmationDto);

        String email = confirmationDto.getEmail();
        String code = confirmationDto.getCode();
        String proofKey = obtainProofKey(request);

        recoveryService.processRecoveryConfirmation(email, code, proofKey);
    }

    @PostMapping(value = "/recovery/set-password", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void processRecoveryCompletion(
            @RequestBody MultiValueMap<String, String> formData,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws GenericErrorException {
        RecoveryCompletionDto completionDto = RecoveryCompletionDto.fromFormData(formData);
        GenericErrorException.throwIfViolationsFound(validator, completionDto);

        String email = completionDto.getEmail();
        String password = completionDto.getPassword();
        String proofKey = obtainProofKey(request);

        User user = recoveryService.performRecovery(email, password, proofKey);

        Cookie cookie = new Cookie(PROOF_KEY_COOKIE_NAME, "");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        response.setHeader("Location", "/auth/sign-in");
        response.setStatus(308);
    }

    private String obtainProofKey(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (PROOF_KEY_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

}
