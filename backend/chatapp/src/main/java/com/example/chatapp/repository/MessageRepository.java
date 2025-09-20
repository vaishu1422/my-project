package com.example.chatapp.repository;

import com.example.chatapp.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MessageRepository extends MongoRepository<ChatMessage, String> {
    // Custom query to get messages by room
    List<ChatMessage> findByRoom(String room);
}
