package ru.easyroadmap.website.api.v1.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public abstract class ApiControllerBase {

    protected final String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails)
            return userDetails.getUsername();

        throw new IllegalStateException("Unable to resolve current authentication as one of expected!");
    }

}
