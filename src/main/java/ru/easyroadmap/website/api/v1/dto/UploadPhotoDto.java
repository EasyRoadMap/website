package ru.easyroadmap.website.api.v1.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class UploadPhotoDto {

    public static final int PHOTO_MAX_WIDTH = 1024;
    public static final int PHOTO_MAX_HEIGHT = 1024;

    @NotNull
    private MultipartFile photo;

    @NotNull @Range(min = 0, max = PHOTO_MAX_WIDTH)
    private int x;

    @NotNull @Range(min = 0, max = PHOTO_MAX_WIDTH)
    private int y;

    @NotNull @Range(min = 0, max = PHOTO_MAX_WIDTH)
    private int width;

    @NotNull @Range(min = 0, max = PHOTO_MAX_WIDTH)
    private int height;

}
