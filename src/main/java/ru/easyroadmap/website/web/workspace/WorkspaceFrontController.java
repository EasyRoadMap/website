package ru.easyroadmap.website.web.workspace;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workspace")
public class WorkspaceFrontController {

    @GetMapping(value = {
            "",
            "/projects",
            "/project",
            "/settings",
            "/invite"
    })
    public String handleDefaultRequest() {
        return "workspace";
    }

}
