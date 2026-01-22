package org.example.controller;

import org.example.domain.PrivateMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller()
public class PrivateChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public PrivateChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/privada")
    public void enviaMensagemPrivada(PrivateMessage mensagemPrivada) {
        messagingTemplate.convertAndSendToUser(
                mensagemPrivada.getTo(),
                "/queue/messages",
                mensagemPrivada.getContent()
        );
    }
}
