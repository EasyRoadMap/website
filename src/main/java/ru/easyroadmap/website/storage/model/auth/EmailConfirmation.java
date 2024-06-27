package ru.easyroadmap.website.storage.model.auth;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity @Table(name = "email_confirmations")
public final class EmailConfirmation {

    private static final int DEFAULT_CONFIRM_ATTEMPTS = 5;
    private static final long REQUEST_WILL_BE_EXPIRED_IN = 5L;
    private static final long REQUEST_CAN_BE_RENEWED_IN = 1L;

    @Id
    @Column(name = "email", nullable = false, length = 64)
    private String email;

    @Column(name = "code", nullable = false, length = 6)
    private String code;

    @Column(name = "proof_key", nullable = false, length = 32)
    private String proofKey;

    @Column(name = "attempts_left", nullable = false)
    private int attemptsLeft;

    @Column(name = "is_confirmed", nullable = false)
    private boolean confirmed;

    @Column(name = "requested_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime requestedAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Column(name = "expires_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiresAt;

    public EmailConfirmation(String email) {
        this.email = email;
    }

    public LocalDateTime getCanBeRenewedAt() {
        return requestedAt.plusMinutes(REQUEST_CAN_BE_RENEWED_IN);
    }

    public boolean canBeRenewed() {
        return isExpired() || getCanBeRenewedAt().isBefore(LocalDateTime.now());
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
        this.requestedAt = LocalDateTime.now();
        this.updatedAt = requestedAt;
        this.expiresAt = requestedAt.plusMinutes(REQUEST_WILL_BE_EXPIRED_IN);
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
        this.updatedAt = LocalDateTime.now();
    }

}
