package com.example.chatwebapp.repository;

import com.example.chatwebapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
     boolean existsByEmail(String email);
}