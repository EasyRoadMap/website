package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

public record PageableCollection<T>(
        @JsonProperty("content") List<T> content,
        @JsonProperty("pagination") Pagination pagination
) {

    public static <T, R> PageableCollection<R> fromPage(Page<T> page, Function<T, R> mapper) {
        Pagination pagination = new Pagination(
                page.getPageable().getPageNumber() + 1,
                page.getTotalPages(),
                page.getPageable().getPageSize(),
                page.getTotalElements()
        );

        return new PageableCollection<>(page.map(mapper).toList(), pagination);
    }

    public record Pagination(
            @JsonProperty("current_page") int currentPage,
            @JsonProperty("total_pages") int totalPages,
            @JsonProperty("page_size") int pageSize,
            @JsonProperty("total_elements") long totalElements
    ) { }

}
