package ru.easyroadmap.website.web;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.function.BiConsumer;

@Controller
public final class ERMErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        int statusCode = status != null ? Integer.parseInt(status.toString()) : 500;
        addModelAttributes(statusCode, model::addAttribute);
        return "error";
    }

    public static void addModelAttributes(int statusCode, BiConsumer<String, Object> attributeConsumer) {
        attributeConsumer.accept("error_code", statusCode);
        attributeConsumer.accept("error_message", HttpStatus.resolve(statusCode).getReasonPhrase());

        String description = switch (statusCode) {
            case 400 -> "Запрос отправлен неправильно.";
            case 401 -> "Для доступа к данной странице требуется авторизация.";
            case 403 -> "Доступ к данной странице ограничен.";
            case 404 -> "Запрашиваемая страница не найдена.";
            case 500 -> "Ошибка на стороне сервера, мы уже работаем над этим!";
            default -> "Произошла неизвестная ошибка, попробуйте ещё раз.";
        };

        attributeConsumer.accept("error_description", description);
    }

}
