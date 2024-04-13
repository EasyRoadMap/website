package ru.easyroadmap.website.web.workspace.controller;

import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workspace")
public class WorkspaceFrontController {

    @GetMapping(value = {
            "/**"
    })
    public String handleDefaultRequest(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            model.addAttribute("username", userDetails.getUsername());

            if (authentication instanceof RememberMeAuthenticationToken cast) {
                model.addAttribute("remember_me", "через токен 'запомнить меня'");
            } else {
                model.addAttribute("remember_me", "через логин и пароль");
            }
        }

        return "workspace";
    }

}
