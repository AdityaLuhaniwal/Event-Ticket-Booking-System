package com.aditya.eventbooking.service;

import com.aditya.eventbooking.dto.LoginRequest;
import com.aditya.eventbooking.dto.LoginResponse;
import com.aditya.eventbooking.dto.UserRequest;
import com.aditya.eventbooking.dto.UserResponse;
import com.aditya.eventbooking.entity.User;
import com.aditya.eventbooking.repository.UserRepository;
import com.aditya.eventbooking.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // Signup
    public UserResponse register(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }

    // Login
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return LoginResponse.builder()
                .userId(user.getId())
                .token(token)
                .message("Login Successful")
                .build();
    }
}