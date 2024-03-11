package ru.easyroadmap.website.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import ru.easyroadmap.website.auth.ERMAuthenticationHandler;
import ru.easyroadmap.website.auth.service.UserStorageService;
import ru.easyroadmap.website.storage.repository.UserRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

//    private final DataSource dataSource;
    private final UserRepository userRepository;
    private final ERMAuthenticationHandler authenticationHandler;

    @Value("${server.auth.default-redirect-url}")
    private String authDefaultRedirectUrl;
    @Value("${server.host}")
    private String serverHost;

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/", "/error", "/erm-web/**", "/favicon.ico").permitAll()
                        .requestMatchers("/docs/openapi", "/docs/swagger", "/docs/swagger-ui/**").permitAll()
                        .requestMatchers("/auth/sign-up/complete").authenticated()
                        .requestMatchers("/auth/**", "/logout").permitAll()
                        .anyRequest().authenticated())
                .csrf(csrf -> csrf
                        .csrfTokenRepository(new HttpSessionCsrfTokenRepository()))
                .sessionManagement(sessionManagement -> sessionManagement
                        .maximumSessions(1))
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/auth")))
                .formLogin(formLogin -> formLogin
                        .loginPage("/auth")
                        .loginProcessingUrl("/auth/sign-in")
                        .successHandler(authenticationHandler)
                        .failureHandler(authenticationHandler)
                        .defaultSuccessUrl(authDefaultRedirectUrl)
                        .usernameParameter("email")
                        .passwordParameter("password"))
                .logout(logout -> logout
                        .deleteCookies("JSESSIONID")
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/auth"))
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserStorageService(userRepository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

}