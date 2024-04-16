package ru.easyroadmap.website.api.v1.dto.project;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import ru.easyroadmap.website.exception.GenericErrorException;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class PutProjectLinksDto {

    @Size(max = 3)
    private String[] name;

    @Size(max = 3)
    private String[] url;

    public List<LinkFacade> collect() throws GenericErrorException {
        int nameCount = name != null ? name.length : 0;
        int urlCount = url != null ? url.length : 0;

        if (nameCount != urlCount)
            throw new GenericErrorException(HttpStatus.BAD_REQUEST, "bad_links", "Count of names must be equal to count of urls");

        if (nameCount == 0)
            return null;

        List<LinkFacade> facades = new ArrayList<>();

        for (int i = 0; i < nameCount; i++) {
            String name = this.name[i];
            if (name == null || name.isEmpty() || name.length() > 32)
                throw new GenericErrorException(HttpStatus.BAD_REQUEST, "bad_links", "A link name must be a string with length in [1;32]");

            String url = this.url[i];
            if (url == null || url.isEmpty() || url.length() > 120)
                throw new GenericErrorException(HttpStatus.BAD_REQUEST, "bad_links", "A link URL must be a string with length in [1;120]");

            facades.add(new LinkFacade(name, url));
        }

        return facades;
    }

    private LinkFacade createFacade(String name, String url) {
        return name != null && url != null ? new LinkFacade(name, url) : null;
    }

    public record LinkFacade(String name, String url) { }

}
