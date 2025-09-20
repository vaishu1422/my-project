package com.example.chatwebapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String sender;
    private String receiver; // username or "all"
    private String content;
    private String room;      // chat-room-1 or chat-room-2
    private LocalDateTime timestamp;

    public Message() {}

    public Message(String sender, String receiver, String content, String room) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.room = room;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getReceiver() { return receiver; }
    public void setReceiver(String receiver) { this.receiver = receiver; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
