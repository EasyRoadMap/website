package ru.easyroadmap.website.web.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ProviderNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ru.easyroadmap.website.model.ErrorModel;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class ERMAuthenticationHandler extends SavedRequestAwareAuthenticationSuccessHandler implements AuthenticationFailureHandler {

    private static final String DEFAULT_ERROR_CODE = "unexpected_error";

    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        String errorCode = DEFAULT_ERROR_CODE;
        String errorMessage = exception.getMessage();

        if (exception instanceof BadCredentialsException || exception instanceof UsernameNotFoundException) {
            errorCode = "bad_credentials";
            errorMessage = "The username or password is incorrect";
        } else if (exception instanceof ProviderNotFoundException) {
            errorCode = "provider_not_found";
            errorMessage = "Provider not found";
        }

        ErrorModel error = new ErrorModel(errorCode, errorMessage);
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.setContentType("application/json");
        objectMapper.writeValue(response.getOutputStream(), error);
    }

}
