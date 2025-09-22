package com.example.chatwebapp.repository;

import com.example.chatwebapp.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    // For group chats
    List<Message> findByRoomOrderByTimestampAsc(String room);

    // For both group & private chats (recommended new method)
    List<Message> findByChatIdOrderByTimestampAsc(String chatId);
}
