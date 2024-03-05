package ru.easyroadmap.website.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthFrontController {

    @GetMapping({
            "",
            "/sign-in",
            "/sign-up",
            "/recovery",
            "/recovery/code",
            "/recovery/complete",
            "/complete"
    })
    public String handleDefaultRequest() {
        return "auth";
    }

}