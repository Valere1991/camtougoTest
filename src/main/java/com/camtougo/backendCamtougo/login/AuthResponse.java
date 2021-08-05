package com.camtougo.backendCamtougo.login;

import com.camtougo.backendCamtougo.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private User user;
}
