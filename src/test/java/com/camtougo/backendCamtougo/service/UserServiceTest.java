package com.camtougo.backendCamtougo.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
class UserServiceTest {

    @Test
    void savedUser() {
    }

    @Test
    void enabledUser() {
    }

    @Test
    void savedAdmin() {
    }

    @Test
    void enabledAdmin() {
    }

    @Test
    void savedManager() {
    }

    @Test
    void enabledManager() {
    }

    @Test
    void savedBPartner() {
    }

    @Test
    void enabledBPartner() {
    }

    @Test
    void findByUsername() {
    }

    @Test
    void findByusernameAndPassword() {
    }

    @Test
    void updateResetPasswordToken() {
    }

    @Test
    void get() {
    }

    @Test
    void updatePassword() {
    }

    @Test
    void getByResetPasswordToken() {
    }

    @Test
    void updateUser() {
    }
}
