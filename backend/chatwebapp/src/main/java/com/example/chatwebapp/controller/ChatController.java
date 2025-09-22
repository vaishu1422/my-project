package com.example.chatwebapp.controller;

import com.example.chatwebapp.kafka.ChatProducer;
import com.example.chatwebapp.model.Message;
import com.example.chatwebapp.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
        if (message.getTimestamp() == null) {
            message.setTimestamp(LocalDateTime.now());
        }

        // ✅ ensure chatId is set
        if (message.getChatId() == null || message.getChatId().isEmpty()) {
            if (message.getRoom() != null && !message.getRoom().isEmpty()) {
                message.setChatId(message.getRoom()); // group chat fallback
            } else if (message.getSender() != null && message.getReceiver() != null) {
                // private chat → generate unique chatId
                String chatId = generatePrivateChatId(message.getSender(), message.getReceiver());
                message.setChatId(chatId);
            }
        }

        // Save to DB
        messageRepository.save(message);

        // Send via Kafka (to chatId instead of just room)
        chatProducer.sendMessage(message.getChatId(), message);

        return "Message sent!";
    }

    @GetMapping("/history/{chatId}")
    public List<Message> getChatHistory(@PathVariable String chatId) {
        return messageRepository.findByChatIdOrderByTimestampAsc(chatId);
    }

    // ✅ helper method to generate unique private chatId (same order every time)
    private String generatePrivateChatId(String sender, String receiver) {
        return (sender.compareTo(receiver) < 0)
                ? sender + "_" + receiver
                : receiver + "_" + sender;
    }
}
