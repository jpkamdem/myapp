package org.myapp.backend.config;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.myapp.backend.middlewares.UserPermsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable())
        .httpBasic(basic -> basic.disable())
        .formLogin(form -> form.disable())
        .authorizeHttpRequests(requests -> requests
            .anyRequest().permitAll())
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public FilterRegistrationBean<UserPermsFilter> permsFilter(UserPermsFilter userPermsFilter) {
    FilterRegistrationBean<UserPermsFilter> userPermsBean = new FilterRegistrationBean<>();
    userPermsBean.setFilter(userPermsFilter);
    userPermsBean.addUrlPatterns("/api/users/*");
    userPermsBean.setOrder(0);
    return userPermsBean;
  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(@NonNull CorsRegistry registry) {
        String origin = "http://127.0.0.1:4200";
        registry
            .addMapping("/api/auth/*")
            .allowedOrigins(origin)
            .allowedMethods("POST")
            .allowedHeaders("Content-Type")
            .allowCredentials(true);
        registry
            .addMapping("/api/users/*")
            .allowedOrigins(origin)
            .allowedMethods("GET", "PUT", "DELETE")
            .allowedHeaders("Content-Type")
            .allowCredentials(true);
      }
    };
  }

}