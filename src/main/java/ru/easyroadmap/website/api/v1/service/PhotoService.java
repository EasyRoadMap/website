package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.local.FileSystemStorage;
import ru.easyroadmap.website.storage.model.Photo;
import ru.easyroadmap.website.storage.repository.PhotoRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
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

    public static final int MIN_PHOTO_WIDTH = 200;
    public static final int MIN_PHOTO_HEIGHT = 200;
    public static final int MAX_PHOTO_WIDTH = 1024;
    public static final int MAX_PHOTO_HEIGHT = 1024;

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

    public PhotoModel getPhotoModelOrDefaultPicture(UUID uuid) {
        return getPhotoModel(uuid).orElseGet(() -> generateDefaultPhotoModel(uuid, serverHost));
    }

    public Path getPhotoPath(UUID uuid) {
        String name = uuid.toString();
        return fileSystemStorage.getPath(name.substring(0, 2)).resolve(name);
    }

    public PhotoModel savePhoto(UUID uuid, MultipartFile content) throws ApiException {
        try (InputStream inputStream = content.getInputStream()) {
            BufferedImage image = ImageIO.read(inputStream);
            int width = image.getWidth();
            int height = image.getHeight();

            if (width < MIN_PHOTO_WIDTH || height < MIN_PHOTO_HEIGHT)
                throw new ApiException("too_small_image", "The image must not be smaller than 200x200");

            if (width > MAX_PHOTO_WIDTH || height > MAX_PHOTO_HEIGHT)
                throw new ApiException("too_large_image", "The image must not be larger than 1024x1024");

            if (width != height)
                throw new ApiException("bad_image_ratio", "The image must be squared (w = h)");

            try {
                Path photoPath = getPhotoPath(uuid);
                if (!Files.isDirectory(photoPath.getParent()))
                    Files.createDirectories(photoPath.getParent());

                Files.write(photoPath, content.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            } catch (IOException ex) {
                log.warn("Unable to write uploaded image: {}", ex.toString());
                throw new ApiException("bad_image", "The image cannot be read");
            }

            Photo photo = new Photo(uuid, width, height);
            photoRepository.save(photo);
            return PhotoModel.fromPhoto(serverHost, photo);
        } catch (IOException ex) {
            log.warn("Unable to read uploaded image: {}", ex.toString());
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "bad_image", "The image cannot be written");
        }
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

    private static PhotoModel generateDefaultPhotoModel(UUID uuid, String serverHost) {
        byte index = (byte) (Math.abs(uuid.getLeastSignificantBits()) % 8);
        return new PhotoModel(7, 7, "%s/erm-web/sp/%d.png".formatted(serverHost, index), true);
    }

}
