package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.local.FileSystemStorage;
import ru.easyroadmap.website.storage.model.Photo;
import ru.easyroadmap.website.storage.repository.PhotoRepository;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Optional;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.model.PhotoModel.fromPhoto;

@Slf4j
@Service
@RequiredArgsConstructor
public final class PhotoService {

    private final PhotoRepository photoRepository;
    private final FileSystemStorage fileSystemStorage;

    @Value("${server.host}")
    private String serverHost;

    public Optional<Photo> getPhoto(UUID uuid) {
        return photoRepository.findById(uuid);
    }

    public Optional<PhotoModel> getPhotoModel(UUID uuid) {
        return getPhoto(uuid).map(photo -> fromPhoto(serverHost, photo));
    }

    public Path getPhotoPath(UUID uuid) {
        String name = uuid.toString();
        return fileSystemStorage.getPath(name.substring(0, 2)).resolve(name);
    }

    public PhotoModel savePhoto(UUID uuid, MultipartFile content, int x, int y, int width, int height) throws ApiException {
        if (x > width)
            throw new ApiException("bad_x_offset", "The X-offset for this photo is too big");

        if (y > height)
            throw new ApiException("bad_y_offset", "The Y-offset for this photo is too big");

        try {
            Path photoPath = getPhotoPath(uuid);

            if (!Files.isDirectory(photoPath.getParent()))
                Files.createDirectories(photoPath.getParent());

            Files.write(photoPath, content.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (IOException ex) {
            log.warn("Unable to write user image: {}", ex.toString());
            throw new ApiException("bad_image", "The image cannot be saved");
        }

        Photo photo = new Photo(uuid, x, y, width, height);
        photoRepository.save(photo);
        return PhotoModel.fromPhoto(serverHost, photo);
    }

    public static UUID generateUserPhotoID(String email) {
        return generatePhotoID('u' + email);
    }

    public static UUID generateWorkspacePhotoID(UUID workspaceId) {
        return generatePhotoID('w' + workspaceId.toString());
    }

    public static UUID generateProjectPhotoID(UUID projectId) {
        return generatePhotoID('p' + projectId.toString());
    }

    public static UUID generatePhotoID(String data) {
        return UUID.nameUUIDFromBytes(data.getBytes(StandardCharsets.UTF_8));
    }

}
