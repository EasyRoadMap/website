package ru.easyroadmap.website.web.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthFrontController {

    @GetMapping(value = {
            "/sign-in",
            "/sign-up",
            "/sign-up/email-code",
            "/sign-up/complete",
            "/recovery/email-code",
            "/recovery/change-password",
            "/recovery/complete"
    })
    public String handleDefaultRequest() {
        return "auth";
    }

}