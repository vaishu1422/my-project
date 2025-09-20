package com.example.chatapp.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    // Default topic application.properties se aayega
    @Value("${chat.topic.name}")
    private String defaultTopic;

    // Default topic par bhejna
    public void sendMessage(String message) {
        kafkaTemplate.send(defaultTopic, message);
        System.out.println("📤 Sent message to Kafka topic [" + defaultTopic + "]: " + message);
    }

    // Agar custom topic chahiye to ye method use karna
    public void sendMessageToTopic(String topic, String message) {
        kafkaTemplate.send(topic, message);
        System.out.println("📤 Sent message to Kafka topic [" + topic + "]: " + message);
    }
}
