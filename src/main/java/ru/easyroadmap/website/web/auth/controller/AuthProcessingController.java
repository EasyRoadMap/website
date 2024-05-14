package ru.easyroadmap.website.web.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.easyroadmap.website.docs.annotation.GenericErrorResponse;
import ru.easyroadmap.website.docs.annotation.SuccessResponse;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.web.auth.dto.*;
import ru.easyroadmap.website.web.auth.service.RecoveryService;
import ru.easyroadmap.website.web.auth.service.RegistrationService;

import static ru.easyroadmap.website.web.auth.service.EmailConfirmationService.ProofKeyConsumer.cookieBased;
import static ru.easyroadmap.website.web.auth.service.EmailConfirmationService.extractProofKey;
import static ru.easyroadmap.website.web.auth.service.EmailConfirmationService.forgetProofKey;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public final class AuthProcessingController {

    private final RegistrationService registrationService;
    private final RecoveryService recoveryService;

    @Operation(summary = "Вход в аккаунт", tags = "auth-api")
    @ApiResponse(responseCode = "302", description = "Вход выполнен, переадресация на `/workspace`")
    @GenericErrorResponse("bad_credentials")
    @PostMapping(value = "/sign-in", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public void processSignIn(@Valid SignInDto dto) {}

    @Operation(summary = "Запрос кода подтверждения регистрации", tags = "auth-api")
    @SuccessResponse("Код подтверждения регистрации отправлен")
    @GenericErrorResponse({"email_already_used", "email_already_confirmed", "email_confirmation_unrenewable", "email_confirmation_pending"})
    @PostMapping(value = "/sign-up/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processSignUpCodeRequest(@Valid SignUpCodeRequestDto dto, HttpServletResponse response) throws ApiException {
        registrationService.processConfirmationRequest(dto.getEmail(), dto.getName(), dto.isRenew(), cookieBased(response));
    }

    @Operation(summary = "Подтверждение регистрации с помощью кода", tags = "auth-api")
    @SuccessResponse("Выполнено подтверждение почты для регистрации аккаунта")
    @GenericErrorResponse({"request_not_found", "request_expired", "wrong_proof_key", "no_more_attempts", "wrong_code"})
    @PostMapping(value = "/sign-up/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processSignUpConfirmation(@Valid SignUpConfirmationDto dto, HttpServletRequest request) throws ApiException {
        registrationService.processEmailConfirmation(dto.getEmail(), dto.getCode(), extractProofKey(request));
    }

    @Operation(summary = "Регистрация пользователя", tags = "auth-api")
    @SuccessResponse("Новый пользователь зарегистрирован")
    @GenericErrorResponse({"user_already_exists", "email_not_confirmed", "wrong_proof_key"})
    @PostMapping(value = "/sign-up/complete", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processSignUpComplete(@Valid SignUpCompleteDto dto, HttpServletRequest request, HttpServletResponse response) throws ApiException {
        registrationService.registerNewUser(dto.getEmail(), dto.getName(), dto.getPassword(), extractProofKey(request));
        forgetProofKey(response);
    }

    @Operation(summary = "Запрос кода восстановления доступа", tags = "auth-api")
    @SuccessResponse("Код восстановления доступа отправлен")
    @GenericErrorResponse({"user_not_found", "email_already_confirmed", "email_confirmation_unrenewable", "email_confirmation_pending"})
    @PostMapping(value = "/recovery/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryCodeRequest(@Valid RecoveryCodeRequestDto dto, HttpServletResponse response) throws ApiException {
        recoveryService.processConfirmationRequest(dto.getEmail(), dto.isRenew(), cookieBased(response));
    }

    @Operation(summary = "Подтверждение восстановления с помощью кода", tags = "auth-api")
    @SuccessResponse("Выполнено подтверждение почты для восстановления доступа")
    @GenericErrorResponse({"user_not_found", "request_not_found", "request_expired", "wrong_proof_key", "no_more_attempts", "wrong_code"})
    @PostMapping(value = "/recovery/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryConfirmation(@Valid RecoveryConfirmationDto dto, HttpServletRequest request) throws ApiException {
        recoveryService.processEmailConfirmation(dto.getEmail(), dto.getCode(), extractProofKey(request));
    }

    @Operation(summary = "Восстановление доступа", tags = "auth-api")
    @SuccessResponse("Пароль успешно изменен")
    @GenericErrorResponse({"user_not_found", "email_not_confirmed", "wrong_proof_key"})
    @PostMapping(value = "/recovery/change-password", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryChangePassword(@Valid RecoveryChangePasswordDto dto, HttpServletRequest request, HttpServletResponse response) throws ApiException {
        recoveryService.performRecovery(dto.getEmail(), dto.getPassword(), extractProofKey(request));
        forgetProofKey(response);
    }

    @Operation(summary = "Выход из аккаунта", tags = "auth-api")
    @ApiResponse(responseCode = "302", description = "Выход выполнен, переадресация на `/auth/sign-in`")
    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public void processLogout() {}

}
