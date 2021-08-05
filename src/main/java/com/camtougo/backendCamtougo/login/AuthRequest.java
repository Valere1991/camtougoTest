package com.camtougo.backendCamtougo.login;

import lombok.Data;

@Data
public class AuthRequest {

    private String username;
    private String password;
}
