package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import ru.easyroadmap.website.api.v1.model.DomainCardModel;
import ru.easyroadmap.website.api.v1.model.PhotoModel;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder(setterPrefix = "with")
public record WorkspaceInvitationModel(
        @JsonProperty("id") UUID id,
        @JsonProperty("inviter") @JsonInclude(JsonInclude.Include.NON_NULL) Inviter inviter,
        @JsonProperty("recipient") @JsonInclude(JsonInclude.Include.NON_NULL) Recipient recipient,
        @JsonProperty("workspace") @JsonInclude(JsonInclude.Include.NON_NULL) DomainCardModel workspace,
        @JsonProperty("expires_at") @JsonFormat(pattern = "yyyy-MM-dd") LocalDateTime expiresAt
) {

    public record Inviter(
            @JsonProperty("name") String name
    ) { }

    public record Recipient(
            @JsonProperty("email") String email,
            @JsonProperty("name") String name,
            @JsonProperty("photo") PhotoModel photo
    ) { }

}
