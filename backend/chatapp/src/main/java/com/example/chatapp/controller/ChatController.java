package com.example.chatapp.controller;

import com.example.chatapp.kafka.MessageProducer;
import com.example.chatapp.model.ChatMessage;
import com.example.chatapp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private MessageProducer producer;

    @Autowired
    private MessageRepository repository;

    // Default topic from application.properties
    @Value("${chat.topic.name}")
    private String defaultTopic;

    // ✅ Send message to default Kafka topic
    @PostMapping("/send")
    public String sendMessage(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        producer.sendMessage(message);  // default topic automatically use hoga
        return "✅ Message sent to Kafka!";
    }

    // ✅ Get chat history from MongoDB
    @GetMapping("/history")
    public List<ChatMessage> getHistory() {
        return repository.findByRoom(defaultTopic);
    }
}
