package com.example.chatwebapp.kafka;

import com.example.chatwebapp.model.Message;
import com.example.chatwebapp.repository.MessageRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ChatConsumer {

    private final MessageRepository messageRepository;

    public ChatConsumer(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @KafkaListener(topics = "chat-room-1", groupId = "chat-group")
    public void consumeRoom1(Message message) {
        messageRepository.save(message);
        System.out.println("Consumed from chat-room-1: " + message.getContent());
    }

    @KafkaListener(topics = "chat-room-2", groupId = "chat-group")
    public void consumeRoom2(Message message) {
        messageRepository.save(message);
        System.out.println("Consumed from chat-room-2: " + message.getContent());
    }
}
