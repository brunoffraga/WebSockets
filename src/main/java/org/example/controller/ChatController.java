package org.example.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller()
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public Map<String, Object> enviar(Map<String, Object> payload) {
        return payload;
    }


}
