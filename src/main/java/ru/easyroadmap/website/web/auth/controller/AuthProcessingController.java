package ru.easyroadmap.website.web.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
import ru.easyroadmap.website.exception.GenericErrorException;
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

    @Operation(summary = "Log in account", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "302",
                    description = "Logged in, redirect to /workspace"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Bad credentials",
                                            value = "{\"error_code\": \"bad_credentials\", \"error_message\": \"The username or password is incorrect\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Provider not found",
                                            description = "This response will come if there is a configuration error on the server side, it should not be on the production!",
                                            value = "{\"error_code\": \"provider_not_found\", \"error_message\": \"Provider not found\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Unexpected error",
                                            description = "This response shouldn't come, but you should handle it :)",
                                            value = "{\"error_code\": \"unexpected_error\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-in", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public void processSignIn(@Valid SignInDto dto) {}

    @Operation(summary = "Request email confirmation code", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Confirmation code has been requested"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Validation error",
                                            value = "{\"error_code\": \"incorrect_field_value\", \"error_message\": \"...\", \"field_name\": \"...\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Generic error",
                                            description = "Used codes: 'email_already_used', 'email_already_confirmed', 'email_confirmation_unrenewable', 'email_confirmation_pending'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-up/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processSignUpCodeRequest(@Valid SignUpCodeRequestDto dto, HttpServletResponse response) throws GenericErrorException {
        registrationService.processConfirmationRequest(dto.getEmail(), dto.getName(), dto.isRenew(), cookieBased(response));
    }

    @Operation(summary = "Confirm email with code", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Email has been confirmed"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Validation error",
                                            value = "{\"error_code\": \"incorrect_field_value\", \"error_message\": \"...\", \"field_name\": \"...\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Generic error",
                                            description = "Used codes: 'request_not_found', 'request_expired', 'wrong_proof_key', 'no_more_attempts', 'wrong_code'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-up/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processSignUpConfirmation(@Valid SignUpConfirmationDto dto, HttpServletRequest request) throws GenericErrorException {
        registrationService.processEmailConfirmation(dto.getEmail(), dto.getCode(), extractProofKey(request));
    }

    @Operation(summary = "Register a new user", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "A new user has been registered"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Validation error",
                                            value = "{\"error_code\": \"incorrect_field_value\", \"error_message\": \"...\", \"field_name\": \"...\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Generic error",
                                            description = "Used codes: 'user_already_exists', 'email_not_confirmed', 'wrong_proof_key'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-up/complete", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processSignUpComplete(@Valid SignUpCompleteDto dto, HttpServletRequest request, HttpServletResponse response) throws GenericErrorException {
        registrationService.registerNewUser(dto.getEmail(), dto.getName(), dto.getPassword(), extractProofKey(request));
        forgetProofKey(response);
    }

    @Operation(summary = "Request email confirmation code", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Confirmation code has been requested"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Validation error",
                                            value = "{\"error_code\": \"incorrect_field_value\", \"error_message\": \"...\", \"field_name\": \"...\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Generic error",
                                            description = "Used codes: 'user_not_found', 'email_already_confirmed', 'email_confirmation_unrenewable', 'email_confirmation_pending'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/recovery/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryCodeRequest(@Valid RecoveryCodeRequestDto dto, HttpServletResponse response) throws GenericErrorException {
        recoveryService.processConfirmationRequest(dto.getEmail(), dto.isRenew(), cookieBased(response));
    }

    @Operation(summary = "Confirm email with code", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Email has been confirmed"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Validation error",
                                            value = "{\"error_code\": \"incorrect_field_value\", \"error_message\": \"...\", \"field_name\": \"...\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Generic error",
                                            description = "Used codes: 'user_not_found', 'request_not_found', 'request_expired', 'wrong_proof_key', 'no_more_attempts', 'wrong_code'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/recovery/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryConfirmation(@Valid RecoveryConfirmationDto dto, HttpServletRequest request) throws GenericErrorException {
        recoveryService.processEmailConfirmation(dto.getEmail(), dto.getCode(), extractProofKey(request));
    }

    @Operation(summary = "Complete recovery process", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Password changed"
            ),
            @ApiResponse(
                    responseCode = "400",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Validation error",
                                            value = "{\"error_code\": \"incorrect_field_value\", \"error_message\": \"...\", \"field_name\": \"...\"}"
                                    ),
                                    @ExampleObject(
                                            name = "Generic error",
                                            description = "Used codes: 'user_not_found', 'email_not_confirmed', 'wrong_proof_key'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/recovery/change-password", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryChangePassword(@Valid RecoveryChangePasswordDto dto, HttpServletRequest request, HttpServletResponse response) throws GenericErrorException {
        recoveryService.performRecovery(dto.getEmail(), dto.getPassword(), extractProofKey(request));
        forgetProofKey(response);
    }

    @Operation(summary = "Log out", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "302",
                    description = "Logged out, redirect to /auth/sign-in"
            )
    })
    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public void processLogout() {}

}
