package com.example.chatwebapp.service;

import com.example.chatwebapp.model.User;
import com.example.chatwebapp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public String signup(User user) {
        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already exists";
        }
        
        // Save user to database
        userRepository.save(user);
        return "User registered successfully";
    }
    
    public boolean login(String username, String password) {
        // Find user by username
        User user = userRepository.findByUsername(username);
        
        // Check if user exists and password matches
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        
        return false;
    }
}