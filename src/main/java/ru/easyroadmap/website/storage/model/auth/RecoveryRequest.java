package ru.easyroadmap.website.storage.model.auth;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity @Table(name = "recovery_requests")
public final class RecoveryRequest {

    private static final int DEFAULT_CONFIRM_ATTEMPTS = 5;

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "proof_key", nullable = false)
    private String proofKey;

    @Column(name = "attempts_left", nullable = false)
    private int attemptsLeft;

    @Column(name = "is_confirmed", nullable = false)
    private boolean confirmed;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Column(name = "expires_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiresAt;

    public RecoveryRequest(String email, String code, String proofKey) {
        this.email = email;
        renew(code, proofKey);
    }

    public boolean hasNoMoreAttempts() {
        return attemptsLeft <= 0;
    }

    public boolean isExpired() {
        return expiresAt == null || expiresAt.isBefore(LocalDateTime.now());
    }

    public void decreaseAttemptsCounter() {
        this.attemptsLeft--;
        this.updatedAt = LocalDateTime.now();
    }

    public void renew(String code, String proofKey) {
        this.code = code;
        this.proofKey = proofKey;
        this.attemptsLeft = DEFAULT_CONFIRM_ATTEMPTS;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
        this.expiresAt = createdAt.plusMinutes(5L);
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
        this.updatedAt = LocalDateTime.now();
    }

}
