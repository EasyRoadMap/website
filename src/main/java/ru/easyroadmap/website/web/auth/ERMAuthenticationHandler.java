package ru.easyroadmap.website.web.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ProviderNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import ru.easyroadmap.website.model.ErrorModel;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class ERMAuthenticationHandler extends SavedRequestAwareAuthenticationSuccessHandler implements AuthenticationFailureHandler {

    private static final String DEFAULT_ERROR_CODE = "unexpected_error";

    private final ObjectMapper objectMapper;

    private RequestCache requestCache = new HttpSessionRequestCache();

    @Value("${server.auth.default-redirect-url}")
    private String authDefaultRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        SavedRequest savedRequest = requestCache.getRequest(request, response);
        if (savedRequest == null) {
            getRedirectStrategy().sendRedirect(request, response, authDefaultRedirectUrl);
            return;
        }

        String targetUrlParameter = getTargetUrlParameter();
        if (isAlwaysUseDefaultTargetUrl() || (targetUrlParameter != null && StringUtils.hasText(request.getParameter(targetUrlParameter)))) {
            requestCache.removeRequest(request, response);
            super.onAuthenticationSuccess(request, response, authentication);
            return;
        }

        clearAuthenticationAttributes(request);

        // Use the DefaultSavedRequest URL
        String targetUrl = fixForwardedRequestRedirectUrl(request, savedRequest.getRedirectUrl());
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

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

    @Override
    public void setRequestCache(RequestCache requestCache) {
        this.requestCache = requestCache;
    }

    // TODO fix this shit lol
    private static String fixForwardedRequestRedirectUrl(HttpServletRequest request, String targetUrl) {
        if (!request.getRemoteAddr().equals("127.0.0.1"))
            return targetUrl;

        String forwaredProto = request.getHeader("x-forwarded-proto");
        if (forwaredProto == null)
            return targetUrl;

        if (forwaredProto.equalsIgnoreCase("https") && targetUrl.startsWith("http:"))
            return forwaredProto + targetUrl.substring(4);

        return targetUrl;
    }

}
