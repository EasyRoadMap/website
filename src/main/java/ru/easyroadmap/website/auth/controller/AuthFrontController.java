package ru.easyroadmap.website.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthFrontController {

    @GetMapping(value = {
            "",
            "/sign-in",
            "/sign-up",
            "/sign-up/email-code",
            "/sign-up/setup-account",
            "/sign-up/complete",
            "/recovery/email-code",
            "/recovery/set-password"
    })
    public String handleDefaultRequest() {
        return "auth";
    }

}