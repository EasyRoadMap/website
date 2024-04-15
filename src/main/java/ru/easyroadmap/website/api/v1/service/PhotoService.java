package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.storage.local.FileSystemStorage;

@Service
@RequiredArgsConstructor
public final class PhotoService {

    private final FileSystemStorage fileSystemStorage;



}
