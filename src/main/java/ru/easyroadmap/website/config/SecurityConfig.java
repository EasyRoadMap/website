package ru.easyroadmap.website.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

//    private final DataSource dataSource;
//    private final UserRepository userRepository;
//    private final FlowAuthenticationHandler authenticationHandler;

    @Value("${server.host}")
    private String serverHost;

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/", "/error", "/erm-web/**", "/favicon.ico").permitAll()
                        .requestMatchers("/auth/complete").authenticated()
                        .requestMatchers("/auth/**", "/logout").permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(sessionManagement -> sessionManagement
                        .maximumSessions(1))
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/auth")))
                .formLogin(formLogin -> formLogin
                        .loginPage("/auth/sign-in")
                        .loginProcessingUrl("/auth/sign-in")
//                        .successHandler(authenticationHandler)
//                        .failureHandler(authenticationHandler)
                        .usernameParameter("email")
                        .passwordParameter("password"))
                .logout(logout -> logout
                        .deleteCookies("JSESSIONID")
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/auth"))
                .build();
    }

}