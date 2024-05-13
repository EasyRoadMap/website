package ru.easyroadmap.website.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ru.easyroadmap.website.validation.validator.WorkspaceThemeValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = WorkspaceThemeValidator.class)
public @interface WorkspaceTheme {

    String message() default "Invalid theme constant";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
