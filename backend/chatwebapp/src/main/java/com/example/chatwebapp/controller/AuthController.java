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

    private final UserService userService; // Make sure this matches everywhere

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return isValid ? "Login successful!" : "Invalid credentials!";
    }
    
    @GetMapping("/users")
    public List<Map<String, String>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        
        // Return only username and email, exclude password
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