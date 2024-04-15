package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.storage.local.FileSystemStorage;
import ru.easyroadmap.website.storage.model.Photo;
import ru.easyroadmap.website.storage.repository.PhotoRepository;

import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class PhotoService {

    private final PhotoRepository photoRepository;
    private final FileSystemStorage fileSystemStorage;

    public Optional<Photo> getPhoto(UUID uuid) {
        return photoRepository.findById(uuid);
    }

    public Path getPhotoPath(UUID uuid) {
        String name = uuid.toString().replace("-", "");
        return fileSystemStorage.getPath(name.substring(0, 2)).resolve(name);
    }

    public static UUID generateUserPhotoID(String email) {
        return generatePhotoID('u' + email);
    }

    public static UUID generateWorkspacePhotoID(UUID workspaceId) {
        return generatePhotoID('w' + workspaceId.toString().replace("-", ""));
    }

    public static UUID generateProjectPhotoID(UUID projectId) {
        return generatePhotoID('p' + projectId.toString().replace("-", ""));
    }

    public static UUID generatePhotoID(String data) {
        return UUID.nameUUIDFromBytes(data.getBytes(StandardCharsets.UTF_8));
    }

}
