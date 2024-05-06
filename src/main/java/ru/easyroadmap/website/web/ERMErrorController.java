package ru.easyroadmap.website.web;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.function.BiConsumer;

@Controller
public final class ERMErrorController implements ErrorController {

    @GetMapping("/error")
    public String handleError(@RequestParam(name = "status_code", required = false) String queryStatusCode, HttpServletRequest request, Model model) {
        HttpStatus status = null;

        Object requestStatusAttribute = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (requestStatusAttribute != null) {
            try {
                status = HttpStatus.resolve(Integer.parseInt(requestStatusAttribute.toString()));
            } catch (NumberFormatException ignored) {}
        }

        if (status == null && queryStatusCode != null) {
            try {
                status = HttpStatus.resolve(Integer.parseInt(queryStatusCode));
            } catch (NumberFormatException ignored) {}
        }

        if (status == null)
            status = HttpStatus.INTERNAL_SERVER_ERROR;

        addModelAttributes(status, model::addAttribute);
        return "error";
    }

    public static void addModelAttributes(HttpStatus status, BiConsumer<String, Object> attributeConsumer) {
        attributeConsumer.accept("error_code", status.value());
        attributeConsumer.accept("error_message", status.getReasonPhrase());

        String description = switch (status.value()) {
            case 400 -> "Запрос отправлен неправильно.";
            case 401 -> "Для доступа к данной странице требуется авторизация.";
            case 403 -> "Доступ к данной странице ограничен.";
            case 404 -> "Запрашиваемая страница не найдена.";
            case 500 -> "Ошибка на стороне сервера, мы уже работаем над этим!";
            default -> "Произошла неожиданная ошибка, попробуйте ещё раз.";
        };

        attributeConsumer.accept("error_description", description);
    }

}
