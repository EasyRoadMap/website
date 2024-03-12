package ru.easyroadmap.website.web.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.web.auth.dto.*;
import ru.easyroadmap.website.web.auth.service.RecoveryService;
import ru.easyroadmap.website.web.auth.service.RegistrationService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public final class AuthProcessingController {

    private final RegistrationService registrationService;
    private final RecoveryService recoveryService;
    private final Validator validator;

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
    public void processSignIn(@Valid SignInDto signInDto) {}

    @Operation(summary = "Register a new user", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "308",
                    description = "Registered, redirect to /auth/sign-in"
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
                                            description = "Used codes: 'user_already_exists', 'email_not_confirmed'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-up", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void processSignUp(@Valid SignUpDto signUpDto, HttpServletResponse response) throws GenericErrorException {
        User user = registrationService.registerNewUser(signUpDto);
        response.setHeader("Location", "/auth/sign-in");
        response.setStatus(308);
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
                                            description = "Used codes: 'email_already_used', 'email_confirmation_pending', 'email_already_confirmed'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-up/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processEmailCodeRequest(@Valid EmailCodeRequestDto requestDto) throws GenericErrorException {
        registrationService.processEmailCodeRequest(requestDto.getEmail(), requestDto.getName());
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
                                            description = "Used codes: 'request_not_found', 'request_expired', 'no_more_attempts', 'wrong_code'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/sign-up/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processEmailConfirmation(@Valid EmailConfirmationDto confirmationDto) throws GenericErrorException {
        registrationService.processEmailConfirmation(confirmationDto.getEmail(), confirmationDto.getCode());
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
                                            description = "Used codes: 'user_not_found', 'recovery_pending', 'recovery_confirmed'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/recovery/email-code", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryCodeRequest(@Valid RecoveryCodeRequestDto requestDto, HttpServletResponse response) throws GenericErrorException {
        String proofKey = recoveryService.processRecoveryCodeRequest(requestDto.getEmail());
        Cookie cookie = new Cookie(RecoveryService.PROOF_KEY_COOKIE_NAME, proofKey);
        cookie.setMaxAge(RecoveryService.PROOF_KEY_COOKIE_MAX_AGE);
        response.addCookie(cookie);
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
                                            description = "Used codes: 'user_not_found', 'request_not_found', 'wrong_proof_key', 'request_expired', 'no_more_attempts', 'wrong_code'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/recovery/confirm-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void processRecoveryConfirmation(@Valid RecoveryConfirmationDto confirmationDto, HttpServletRequest request) throws GenericErrorException {
        recoveryService.processRecoveryConfirmation(confirmationDto.getEmail(), confirmationDto.getCode(), obtainProofKey(request));
    }

    @Operation(summary = "Complete recovery process", tags = "auth")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "308",
                    description = "Password changed, redirect to /auth/sign-in"
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
                                            description = "Used codes: 'user_not_found', 'request_not_confirmed', 'wrong_proof_key'",
                                            value = "{\"error_code\": \"<one of used codes>\", \"error_message\": \"...\"}"
                                    )
                            }
                    )
            )
    })
    @PostMapping(value = "/recovery/set-password", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void processRecoveryCompletion(@Valid RecoveryCompletionDto completionDto, HttpServletRequest request, HttpServletResponse response) throws GenericErrorException {
        User user = recoveryService.performRecovery(completionDto.getEmail(), completionDto.getPassword(), obtainProofKey(request));

        Cookie cookie = new Cookie(RecoveryService.PROOF_KEY_COOKIE_NAME, "");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        response.setHeader("Location", "/auth/sign-in");
        response.setStatus(308);
    }

    private String obtainProofKey(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (RecoveryService.PROOF_KEY_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

}