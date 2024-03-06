package ru.easyroadmap.website.storage.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.auth.RecoveryRequest;

public interface RecoveryRequestRepository extends JpaRepository<RecoveryRequest, String> {
}
