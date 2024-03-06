package ru.easyroadmap.website.storage.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.auth.EmailConfirmation;

public interface EmailConfirmationRepository extends JpaRepository<EmailConfirmation, String> {
}
