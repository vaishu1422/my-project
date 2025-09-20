package com.example.chatwebapp.controller;

import com.example.chatwebapp.kafka.ChatProducer;
import com.example.chatwebapp.model.Message;
import com.example.chatwebapp.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ChatController {

    private final ChatProducer chatProducer;
    private final MessageRepository messageRepository;

    public ChatController(ChatProducer chatProducer, MessageRepository messageRepository) {
        this.chatProducer = chatProducer;
        this.messageRepository = messageRepository;
    }

    @PostMapping("/send")
    public String sendMessage(@RequestBody Message message) {
        chatProducer.sendMessage(message.getRoom(), message);
        return "Message sent!";
    }

    @GetMapping("/history/{room}")
    public List<Message> getChatHistory(@PathVariable String room) {
        return messageRepository.findByRoomOrderByTimestampAsc(room);
    }
}
