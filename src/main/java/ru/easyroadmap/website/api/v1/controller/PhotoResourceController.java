package ru.easyroadmap.website.api.v1.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.easyroadmap.website.api.v1.service.PhotoService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Controller
@RequestMapping("/erm-web/p")
@RequiredArgsConstructor
public class PhotoResourceController {

    private final PhotoService photoService;

    @GetMapping(value = "/{uuid}", produces = "image/*")
    public ResponseEntity<Resource> getPhotoResource(@PathVariable UUID uuid) {
        Path photoPath = photoService.getPhotoPath(uuid);
        if (!Files.isRegularFile(photoPath))
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(new PathResource(photoPath));
    }

}
