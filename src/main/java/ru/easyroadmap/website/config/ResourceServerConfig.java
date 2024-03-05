package ru.easyroadmap.website.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class ResourceServerConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/erm-web/css/**").addResourceLocations("classpath:/static/css/").setCacheControl(CacheControl.empty());
        registry.addResourceHandler("/erm-web/font/**").addResourceLocations("classpath:/static/font/").setCacheControl(CacheControl.empty());
        registry.addResourceHandler("/erm-web/image/**").addResourceLocations("classpath:/static/image/").setCacheControl(CacheControl.empty());
        registry.addResourceHandler("/erm-web/js/**").addResourceLocations("classpath:/static/built/");
        registry.addResourceHandler("/favicon.ico").addResourceLocations("classpath:/static/").setCacheControl(CacheControl.empty());
    }

}