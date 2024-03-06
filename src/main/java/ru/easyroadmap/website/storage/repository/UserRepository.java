package ru.easyroadmap.website.storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.User;

public interface UserRepository extends JpaRepository<User, String> {
}
