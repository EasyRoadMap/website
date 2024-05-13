package ru.easyroadmap.website.validation.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;
import ru.easyroadmap.website.validation.annotation.WorkspaceTheme;

public final class WorkspaceThemeValidator implements ConstraintValidator<WorkspaceTheme, String> {

    @Override
    public boolean isValid(String theme, ConstraintValidatorContext context) {
        return hasValidThemeConstant(theme);
    }

    public static boolean hasValidThemeConstant(String theme) {
        if (theme != null) {
            try {
                Theme.valueOf(theme.toUpperCase());
                return true;
            } catch (IllegalArgumentException ignored) {
            }
        }

        return false;
    }

}
