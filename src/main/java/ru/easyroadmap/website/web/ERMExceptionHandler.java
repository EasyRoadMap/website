package ru.easyroadmap.website.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.model.ErrorModel;
import ru.easyroadmap.website.model.FieldValidationErrorModel;

import java.net.URI;
import java.util.List;

@ControllerAdvice
@RequiredArgsConstructor
public final class ERMExceptionHandler extends ResponseEntityExceptionHandler {

    private static final List<String> ERROR_VIEW_REDIRECT_CONTEXT_PATH_PREFIXES = List.of(
            "/auth", "/docs", "/legal", "/p", "/workspace"
    );

    private final ObjectMapper objectMapper;

    @Value("${server.host}")
    private String serverHost;

    @ExceptionHandler({ApiException.class, GenericErrorException.class})
    public ResponseEntity<Object> handleGenericError(GenericErrorException ex) {
        if (ex instanceof ApiException) {
            return ResponseEntity.status(ex.getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(ex.constructModel());
        } else {
            return redirectToErrorView(ex.getStatusCode());
        }
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        FieldError fieldError = ex.getBindingResult().getFieldError();

        Object body = fieldError != null
                ? new FieldValidationErrorModel(fieldError.getField(), fieldError.getDefaultMessage())
                : new ErrorModel("incorrect_field_value", "FieldError instance isn't provided!");

        return ResponseEntity.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }

    @Override
    protected ResponseEntity<Object> createResponseEntity(Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        String contextPath = request.getContextPath();
        if (contextPath == null || contextPath.isEmpty() || contextPath.equals("/"))
            return redirectToErrorView(statusCode);

        for (String prefix : ERROR_VIEW_REDIRECT_CONTEXT_PATH_PREFIXES)
            if (contextPath.toLowerCase().startsWith(prefix))
                return redirectToErrorView(statusCode);

        return super.createResponseEntity(body, headers, statusCode, request);
    }

    private ResponseEntity<Object> redirectToErrorView(HttpStatusCode statusCode) {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("%s/error?status_code=%d".formatted(serverHost, statusCode.value())))
                .build();
    }

}
