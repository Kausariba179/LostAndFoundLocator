package edu.infosys.lostFoundLocatorApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.stereotype.Component;
import edu.infosys.lostFoundLocatorApplication.controller.ChatController;

@Component
public class WebSocketEventListner {

	@Autowired
	private ChatController chatController;
	
	@EventListener
	public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
		String sessionId = event.getSessionId();
		chatController.removeUser(sessionId);
	}
}
