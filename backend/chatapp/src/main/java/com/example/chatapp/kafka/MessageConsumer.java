package com.example.chatapp.kafka;

import com.example.chatapp.model.ChatMessage;
import com.example.chatapp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MessageConsumer {

    @Autowired
    private MessageRepository repository;

    // Default topic application.properties se aayega
    @Value("${chat.topic.name}")
    private String defaultTopic;

    // Kafka se message suno
    @KafkaListener(topics = "${chat.topic.name}", groupId = "chat-group")
    public void listen(String message) {
        System.out.println("📥 Received message from Kafka: " + message);

        ChatMessage msg = new ChatMessage();
        msg.setRoom(defaultTopic);  // dynamic topic se room set
        msg.setSender("User");      // abhi dummy sender rakha hai
        msg.setText(message);

        // MongoDB me save karo
        repository.save(msg);
        System.out.println("💾 Saved message in MongoDB (Room=" + defaultTopic + "): " + message);
    }
}
