package com.example.chatwebapp.kafka;

import com.example.chatwebapp.model.Message;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatProducer {

    private final KafkaTemplate<String, Message> kafkaTemplate;

    public ChatProducer(KafkaTemplate<String, Message> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String topic, Message message) {
        kafkaTemplate.send(topic, message);
    }
}
