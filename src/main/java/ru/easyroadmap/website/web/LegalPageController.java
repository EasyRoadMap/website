package ru.easyroadmap.website.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/legal")
public class LegalPageController {

    @GetMapping("/eula")
    public String handleEulaRequest(Model model) {
        model.addAttribute("title", "Лицензионное соглашение");
        model.addAttribute("easyx_ref_name", "Лицензионное соглашение EasyLauncher");
        model.addAttribute("easyx_url", "https://legal.easyx.ru/easylauncher/eula");
        return "legal";
    }

    @GetMapping("/privacy")
    public String handlePrivacyRequest(Model model) {
        model.addAttribute("title", "Политика конфиденциальности");
        model.addAttribute("easyx_ref_name", "Политика конфиденциальности EasyX");
        model.addAttribute("easyx_url", "https://legal.easyx.ru/general/privacy");
        return "legal";
    }

}
