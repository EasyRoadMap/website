package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.local.FileSystemStorage;
import ru.easyroadmap.website.storage.model.FileUpload;
import ru.easyroadmap.website.storage.model.FileUpload.Type;
import ru.easyroadmap.website.storage.repository.FileUploadRepository;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public final class FileUploadService {

    private final FileUploadRepository fileUploadRepository;
    private final FileSystemStorage fileSystemStorage;

    public Optional<FileUpload> findFileUpload(UUID uuid) {
        return fileUploadRepository.findById(uuid);
    }

    public FileUpload getFileUpload(UUID uuid) throws ApiException {
        return findFileUpload(uuid).orElseThrow(() -> new ApiException(
                "file_upload_not_found",
                "File upload with this ID doesn't exists"
        ));
    }

    public boolean isFileUploadExist(UUID uuid) {
        return fileUploadRepository.existsById(uuid);
    }

    public List<FileUpload> getTaskAttachments(long taskId) {
        return fileUploadRepository.findAllTaskAttachments(taskId);
    }

    public boolean isTaskAttachmentExist(UUID uuid) {
        return fileUploadRepository.isTaskAttachmentExist(uuid);
    }

    public FileUpload saveFile(MultipartFile file) throws ApiException {
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isBlank())
            throw new ApiException("undefined_file_name", "File name must be defined");

        String mimeType = file.getContentType();
        if (mimeType == null || mimeType.isBlank())
            throw new ApiException("undefined_content_type", "Content type must be defined");

        try (InputStream inputStream = file.getInputStream()) {
            String md5 = DigestUtils.md5DigestAsHex(inputStream);
            long size = file.getSize();

            Type fileType = Type.fromMimeType(mimeType);
            FileUpload fileUpload = new FileUpload(fileType.getId(), fileName, mimeType, md5, size);
            fileUploadRepository.save(fileUpload);

            Path filePath = getUploadFilePath(fileUpload.getId());

            if (!Files.isDirectory(filePath.getParent()))
                Files.createDirectories(filePath.getParent());

            file.transferTo(filePath);
            return fileUpload;
        } catch (IOException ex) {
            log.warn("Unable to serve uploaded file: {}", ex.toString());
            throw new ApiException("bad_upload", "The upload cannot be served");
        }
    }

    public void deleteUploadedFiles(Iterable<UUID> ids) {
        for (UUID id : ids) {
            Path filePath = getUploadFilePath(id);

            try {
                fileSystemStorage.delete(filePath);
            } catch (IOException ex) {
                log.warn("Unable to delete unused uploaded file '{}': {}", filePath, ex.toString());
                continue;
            }

            fileUploadRepository.deleteById(id);
        }
    }

    public Path getUploadFilePath(UUID id) {
        String name = id.toString();
        return fileSystemStorage.getPath("file-uploads").resolve(name.substring(0, 2)).resolve(name);
    }

}
