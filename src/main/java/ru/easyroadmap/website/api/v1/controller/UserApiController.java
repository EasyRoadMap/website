package ru.easyroadmap.website.api.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.api.v1.dto.UserDeleteDto;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.Photo;
import ru.easyroadmap.website.storage.model.User;

import java.util.Optional;

import static ru.easyroadmap.website.api.v1.model.PhotoModel.fromPhoto;
import static ru.easyroadmap.website.api.v1.service.PhotoService.generateUserPhotoID;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserApiController extends ApiControllerBase {

    private final UserService userService;
    private final PhotoService photoService;

    @Value("${server.host}")
    private String serverHost;

    @GetMapping
    public UserModel getUser() throws ApiException {
        String email = getCurrentUsername();
        String name = getCurrentUser(userService).getName();

        PhotoModel photoModel = photoService.getPhoto(generateUserPhotoID(email))
                .map(p -> fromPhoto(serverHost, p))
                .orElse(null);

        return new UserModel(email, name, photoModel);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@Valid UserDeleteDto dto) throws ApiException {
        String email = getCurrentUsername();

        if (!userService.isUserPassword(email, dto.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");


    }

}
