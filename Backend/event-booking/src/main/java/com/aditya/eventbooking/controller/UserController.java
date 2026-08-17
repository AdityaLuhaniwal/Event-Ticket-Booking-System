package com.aditya.eventbooking.controller;

import com.aditya.eventbooking.dto.LoginRequest;
import com.aditya.eventbooking.dto.LoginResponse;
import com.aditya.eventbooking.dto.UserRequest;
import com.aditya.eventbooking.dto.UserResponse;
import com.aditya.eventbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;


}