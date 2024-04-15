package ru.easyroadmap.website.storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.Photo;

import java.util.UUID;

public interface PhotoRepository extends JpaRepository<Photo, UUID> {
}
