package com.example.websocketApp.config;

import com.example.websocketApp.dto.ChatMessage;
import com.example.websocketApp.enums.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {
    @Autowired
    private SimpMessageSendingOperations messageTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent disconnectEvent){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        String username =  (String) headerAccessor.getSessionAttributes().get("username");
        if(username != null){
            ChatMessage chatMessage = new ChatMessage("",username,MessageType.LEAVE);
            messageTemplate.convertAndSend("/topic/public",chatMessage);
        }
    }
}
