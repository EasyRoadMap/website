package ru.easyroadmap.website.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public final class FieldValidationErrorModel extends ErrorModel {

    @JsonProperty("field_name")
    private final String fieldName;

    public FieldValidationErrorModel(String fieldName, String message) {
        super("incorrect_field_value", message);
        this.fieldName = fieldName;
    }

}
