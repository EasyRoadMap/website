package ru.easyroadmap.website.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.easyroadmap.website.model.ErrorModel;

@ControllerAdvice
@RequiredArgsConstructor
public final class ERMExceptionHandler extends ResponseEntityExceptionHandler {

    private final ObjectMapper objectMapper;

    @ExceptionHandler({ApiException.class, GenericErrorException.class})
    public ResponseEntity<ErrorModel> handleGenericError(GenericErrorException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(ex.constructModel());
    }

    private ResponseEntity<ErrorModel> constructBadRequestResponse(String errorCode, String errorMessage) {
        ErrorModel error = new ErrorModel(errorCode, errorMessage);
        return ResponseEntity.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .body(error);
    }

}
