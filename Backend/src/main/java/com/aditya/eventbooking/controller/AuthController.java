package com.aditya.eventbooking.controller;

import com.aditya.eventbooking.dto.LoginRequest;
import com.aditya.eventbooking.dto.LoginResponse;
import com.aditya.eventbooking.dto.UserRequest;
import com.aditya.eventbooking.dto.UserResponse;
import com.aditya.eventbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register User
    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.register(request);
    }

    // Login User
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}