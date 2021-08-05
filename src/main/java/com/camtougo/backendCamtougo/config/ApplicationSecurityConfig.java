package com.camtougo.backendCamtougo.config;

import com.camtougo.backendCamtougo.config.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtFilter jwtFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/super-admin/*").permitAll()
                .antMatchers("/admin/*").hasRole("ADMIN")
                .antMatchers("/manager/*").hasRole("MANAGER")
                .antMatchers("/business-partnert/*").hasRole("BUSINESS_PARTNER")
                .antMatchers("/user/*").permitAll()
                .antMatchers("/register", "/auth").permitAll()
                .antMatchers("/forgot_password", "/reset_passord").permitAll()
                .antMatchers("/files/*").permitAll()
                .antMatchers("pay").permitAll()
                .antMatchers(HttpMethod.GET, "/cam_city").permitAll()
                .antMatchers(HttpMethod.POST, "/cam_city/*").permitAll()
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
