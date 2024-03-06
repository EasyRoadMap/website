package ru.easyroadmap.website.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public final class EmailPatternValidator implements ConstraintValidator<ValidEmailPattern, String> {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[_A-Za-z0-9-+]+(?>\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(?>\\.[A-Za-z0-9]+)*(?>\\.[A-Za-z]{2,})$");

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return hasValidEmailPattern(email);
    }

    public static boolean hasValidEmailPattern(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

}
