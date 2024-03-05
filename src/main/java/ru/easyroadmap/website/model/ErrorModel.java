package ru.easyroadmap.website.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public final class ErrorModel {

    @JsonProperty("error_code")
    private final String errorCode;

    @JsonProperty("error_message")
    private final String errorMessage;

}
