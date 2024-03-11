package ru.easyroadmap.website.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public final class FieldValidationErrorModel {

    @JsonProperty("error_code")
    private final String errorCode;

    @JsonProperty("error_message")
    private final String errorMessage;

    @JsonProperty("field_name")
    private final String fieldName;

    public FieldValidationErrorModel(String fieldName, String message) {
        this.errorCode = "incorrect_field_value";
        this.errorMessage = message;
        this.fieldName = fieldName;
    }

}
