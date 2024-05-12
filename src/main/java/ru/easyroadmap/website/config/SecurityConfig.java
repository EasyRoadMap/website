package ru.easyroadmap.website.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.DelegatingAuthenticationEntryPoint;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.RequestMatcher;
import ru.easyroadmap.website.storage.repository.UserRepository;
import ru.easyroadmap.website.web.auth.ERMAuthenticationHandler;
import ru.easyroadmap.website.web.auth.service.UserStorageService;

import javax.sql.DataSource;
import java.util.LinkedHashMap;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String REMEMBER_ME_KEY = "EasyRoadMapRMKEY";

    private final UserRepository userRepository;
    private final ERMAuthenticationHandler authenticationHandler;

    @Value("${server.host}")
    private String serverHost;

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, PersistentTokenRepository tokenRepository) throws Exception {
        LinkedHashMap<RequestMatcher, AuthenticationEntryPoint> entryPoints = new LinkedHashMap<>();
        entryPoints.put(antMatcher("/api/**"), new Http403ForbiddenEntryPoint());

        DelegatingAuthenticationEntryPoint authenticationEntryPoint = new DelegatingAuthenticationEntryPoint(entryPoints);
        authenticationEntryPoint.setDefaultEntryPoint(new LoginUrlAuthenticationEntryPoint("/auth/sign-in"));

        return http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/", "/error", "/erm-web/**", "/favicon.ico").permitAll()
                        .requestMatchers("/legal/eula", "/legal/privacy").permitAll()
                        .requestMatchers("/docs/openapi", "/docs/swagger", "/docs/swagger-ui/**").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/p/**").permitAll()
                        .requestMatchers("/api/v1/public/**").permitAll()
                        .requestMatchers("/workspace/**").authenticated()
                        .anyRequest().authenticated())
                .csrf(csrf -> csrf
                        .csrfTokenRepository(new HttpSessionCsrfTokenRepository())
                        .ignoringRequestMatchers(antMatcher("/api/v1/**")))
                .sessionManagement(sessionManagement -> sessionManagement
                        .maximumSessions(1))
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(authenticationEntryPoint))
                .formLogin(formLogin -> formLogin
                        .loginPage("/auth/sign-in")
                        .loginProcessingUrl("/auth/sign-in")
                        .successHandler(authenticationHandler)
                        .failureHandler(authenticationHandler)
                        .usernameParameter("email")
                        .passwordParameter("password"))
                .rememberMe(rememberMe -> rememberMe
                        .key(REMEMBER_ME_KEY)
                        .rememberMeParameter("rememberMe")
                        .tokenRepository(tokenRepository))
                .logout(logout -> logout
                        .deleteCookies("JSESSIONID")
                        .logoutUrl("/auth/logout")
                        .logoutSuccessUrl(serverHost + "/auth/sign-in"))
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserStorageService(userRepository);
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository(DataSource dataSource) {
        JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
        tokenRepository.setDataSource(dataSource);
        return tokenRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean
    public TomcatConnectorCustomizer tomcatConnectorCustomizer() {
        return connector -> connector.setParseBodyMethods("POST,PATCH,PUT,DELETE");
    }

}