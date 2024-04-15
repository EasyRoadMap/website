package ru.easyroadmap.website.api.v1.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;

public abstract class ApiControllerBase {

    protected final String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails)
            return userDetails.getUsername();

        throw new IllegalStateException("Unable to resolve current authentication as one of expected!");
    }

    protected final User getCurrentUser(UserService userService) throws ApiException {
        String email = getCurrentUsername();
        return userService.findByEmail(email)
                .orElseThrow(() -> new ApiException(
                        "user_not_found",
                        "The user was not found for the current authentication"
                ));
    }

}
