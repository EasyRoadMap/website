package ru.easyroadmap.website.api.v1.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.storage.model.User;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserApiController extends ApiControllerBase {

    private final UserService userApiService;

    @GetMapping("/get")
    public UserModel getUser() {
        String email = getCurrentUsername();
        Optional<User> user = userApiService.findByEmail(email);

        return new UserModel(email, null, null);
    }

}
