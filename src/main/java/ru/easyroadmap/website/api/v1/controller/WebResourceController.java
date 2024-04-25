package ru.easyroadmap.website.api.v1.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.easyroadmap.website.api.v1.service.FileUploadService;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.RoadmapService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.FileUpload;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Controller
@RequestMapping("/erm-web")
@RequiredArgsConstructor
public class WebResourceController extends ApiControllerBase {

    private final UserService userService;
    private final PhotoService photoService;
    private final FileUploadService fileUploadService;
    private final RoadmapService roadmapService;

    @GetMapping(value = "/p/{uuid}", produces = "image/*")
    public ResponseEntity<Resource> getPhotoResource(@PathVariable UUID uuid) {
        Path photoPath = photoService.getPhotoPath(uuid);
        if (!Files.isRegularFile(photoPath))
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(new PathResource(photoPath));
    }

    @GetMapping("/u/{uuid}")
    public ResponseEntity<Resource> getFileUploadResource(@PathVariable UUID uuid) throws ApiException {
        String userEmail = requireUserExistance(userService);
        FileUpload fileUpload = fileUploadService.getFileUpload(uuid);

        RoadmapTaskAttachment attachment = roadmapService.getTaskAttachment(uuid);
        roadmapService.requireTaskProjectMembership(userEmail, attachment.getTaskId());

        Path filePath = fileUploadService.getUploadFilePath(uuid);
        if (!Files.isRegularFile(filePath))
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileUpload.getMimeType()))
                .body(new PathResource(filePath));
    }

}
