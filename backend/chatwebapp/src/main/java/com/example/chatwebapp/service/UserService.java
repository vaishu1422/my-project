package com.example.chatwebapp.service;

import com.example.chatwebapp.model.User;
import com.example.chatwebapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // Add PasswordEncoder as a parameter in the constructor
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public String signup(User user) {
        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already exists";
        }
        
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword())); 
        
        // Save user to database
        userRepository.save(user);
        return "User registered successfully";
    }
    
    public boolean login(String username, String password) {
        // Find user by username
        User user = userRepository.findByUsername(username);
        
        // Check if user exists and password matches
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return true;
        }
        
        return false;
    }
}