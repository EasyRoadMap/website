package ru.easyroadmap.website.web.auth.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequestMapping("/auth")
public class AuthFrontController {

    @GetMapping("")
    public void rootEndpointRequest(HttpServletResponse response) throws IOException {
        response.sendRedirect("/auth/sign-in");
    }

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