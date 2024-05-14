package ru.easyroadmap.website.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.examples.Example;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.method.HandlerMethod;
import ru.easyroadmap.website.docs.annotation.GenericErrorResponse;
import ru.easyroadmap.website.docs.annotation.SuccessResponse;
import ru.easyroadmap.website.docs.annotation.WorkspaceAdminOperation;
import ru.easyroadmap.website.model.ErrorModel;
import ru.easyroadmap.website.model.FieldValidationErrorModel;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public final class ERMOperationCustomizer implements OperationCustomizer {

    private final ObjectMapper objectMapper;

    @Override
    public Operation customize(Operation operation, HandlerMethod method) {
        remove418Response(operation);

        SuccessResponse successResponse = method.getMethodAnnotation(SuccessResponse.class);
        if (successResponse != null)
            addSuccessResponse(operation, successResponse.value(), successResponse.canBeEmpty());

        boolean hasValidationError = Arrays.stream(method.getMethodParameters()).anyMatch(p -> p.hasParameterAnnotation(Valid.class));
        GenericErrorResponse genericErrorResponse = method.getMethodAnnotation(GenericErrorResponse.class);
        String[] genericErrorCodes = genericErrorResponse != null ? genericErrorResponse.value() : null;

        if (hasValidationError || (genericErrorCodes != null && genericErrorCodes.length != 0))
            addBadRequestResponse(operation, hasValidationError, genericErrorCodes);

        if (method.hasMethodAnnotation(WorkspaceAdminOperation.class)) {
            String description = operation.getDescription();

            if (description != null)
                description += "\n**Требуются права администратора рабочей области!**";
            else
                description = "**Требуются права администратора рабочей области!**";

            operation.setDescription(description);
        }

        PostMapping postMapping = method.getMethodAnnotation(PostMapping.class);
        if (postMapping != null && ArrayUtils.contains(postMapping.consumes(), "multipart/form-data")) {
            Set<String> formDataParams = new HashSet<>();

            for (MethodParameter parameter : method.getMethodParameters())
                if (parameter.getParameterAnnotations() == null || parameter.getParameterAnnotations().length == 0)
                    formDataParams.add(parameter.getParameter().getName());

            if (formDataParams != null) {
                List<Parameter> parameters = operation.getParameters();
                if (parameters != null) {
                    for (Parameter parameter : parameters) {
                        if (parameter.getName() != null && formDataParams.contains(parameter.getName())) {
                            String description = parameter.getDescription();

                            if (description != null)
                                description += "\nЧасть тела запроса `multipart/form-data`";
                            else
                                description = "Часть тела запроса `multipart/form-data`";

                            parameter.setDescription(description);
                        }
                    }
                }
            }
        }

        return operation;
    }

    public void addSuccessResponse(Operation operation, String description, boolean canBeEmpty) {
        apiResponse(operation, "200", null).description(description);
        apiResponse(operation, "204", "Содержимое отсутствует");
    }

    public void addBadRequestResponse(Operation operation, boolean hasValidationError, String[] errorCodes) {
        ApiResponse apiResponse = apiResponse(operation, "400", "Неверный запрос");

        Content content = apiResponse.getContent();
        if (content == null) {
            content = new Content();
            apiResponse.setContent(content);
        }

        MediaType mediaType = content.get("application/json");
        if (mediaType == null) {
            mediaType = new MediaType();
            content.addMediaType("application/json", mediaType);
        }

        if (hasValidationError) {
            mediaType.addExamples("Ошибка валидации", new Example()
                    .value(new FieldValidationErrorModel("...", "..."))
            );
        }

        if (errorCodes != null && errorCodes.length > 0) {
            String codes = Arrays.stream(errorCodes)
                    .map(code -> code.startsWith("!") ? "**%s**".formatted(code.substring(1)) : code)
                    .map("'%s'"::formatted)
                    .collect(Collectors.joining(", "));

            mediaType.addExamples("Ошибка с кодом", new Example()
                    .description("Возможные коды ошибок: " + codes)
                    .value(new ErrorModel("<код ошибки>", "..."))
            );
        }
    }

    private static void remove418Response(Operation operation) {
        ApiResponses responses = operation.getResponses();
        if (responses != null) {
            responses.remove("418");
        }
    }

    private static ApiResponse apiResponse(Operation operation, String name, String description) {
        ApiResponse response = apiResponses(operation).get(name);
        if (response != null)
            return response;

        response = new ApiResponse().description(description);
        apiResponses(operation).addApiResponse(name, response);
        return response;
    }

    private static ApiResponses apiResponses(Operation operation) {
        ApiResponses responses = operation.getResponses();
        if (responses != null)
            return responses;

        responses = new ApiResponses();
        operation.setResponses(responses);
        return responses;
    }

}
