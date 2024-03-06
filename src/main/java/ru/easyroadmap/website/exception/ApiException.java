package ru.easyroadmap.website.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.text.MessageFormat;

public class ApiException extends GenericErrorException {

    public ApiException(String errorCode, String errorMessage, Object... args) {
        this(HttpStatus.BAD_REQUEST, errorCode, errorMessage, args);
    }

    public ApiException(HttpStatusCode statusCode, String errorCode, String errorMessage, Object... args) {
        super(statusCode, errorCode, formatMessage(errorMessage, args));
    }

    private static String formatMessage(String errorMessage, Object... args) {
        if (errorMessage == null || errorMessage.isEmpty() || args == null || args.length == 0)
            return errorMessage;

        return MessageFormat.format(errorMessage, args);
    }

}
