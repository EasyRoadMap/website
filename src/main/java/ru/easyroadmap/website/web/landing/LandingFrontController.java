package ru.easyroadmap.website.web.landing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class LandingFrontController {

    @GetMapping
    public String handleDefaultRequest() {
        return "landing";
    }

}
