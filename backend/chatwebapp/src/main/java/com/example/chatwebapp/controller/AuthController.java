package com.example.chatwebapp.controller;

import com.example.chatwebapp.model.User;
import com.example.chatwebapp.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) // Add both origins
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return service.signup(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = service.login(loginRequest.getUsername(), loginRequest.getPassword());
        return isValid ? "Login successful!" : "Invalid credentials!";
    }
    
    static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}