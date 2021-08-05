package com.camtougo.backendCamtougo.registration;

public interface EmailSender {
    void send(String to, String email);
}
