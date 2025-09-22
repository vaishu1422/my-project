package com.example.chatwebapp.controller;

import com.example.chatwebapp.model.User;
import com.example.chatwebapp.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        Map<String, Object> response = new HashMap<>();
        
        if (isValid) {
            // Get user details
            User user = userService.findByUsername(loginRequest.getUsername());
            response.put("status", "success");
            response.put("message", "Login successful!");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail()
            ));
        } else {
            response.put("status", "error");
            response.put("message", "Invalid credentials!");
        }
        return response;
    }
    
    @GetMapping("/users")
    public List<Map<String, String>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        
        return users.stream().map(user -> {
            Map<String, String> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("username", user.getUsername());
            userMap.put("email", user.getEmail());
            return userMap;
        }).collect(Collectors.toList());
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