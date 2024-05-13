package ru.easyroadmap.website.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorModel {

    @JsonProperty("error_code")
    private final String errorCode;

    @JsonProperty("error_message")
    private final String errorMessage;

    @JsonProperty("payload")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object payload;

}
