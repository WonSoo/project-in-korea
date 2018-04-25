package kr.pik.mail;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.ext.mail.MailClient;
import io.vertx.ext.mail.MailConfig;
import io.vertx.ext.mail.MailMessage;
import io.vertx.ext.mail.MailResult;
import io.vertx.ext.mail.StartTLSOptions;
import kr.pik.core.RestAPIService;
import kr.pik.utils.database.SecureConfig;

public class MailSender {
	private SecureConfig secureConfig;
	private MailClient mailClient;
	
	private MailSender () {
		secureConfig = SecureConfig.getInstance();
		MailConfig config = new MailConfig();
		
		config.setHostname(secureConfig.getString("Mail.host"));
		config.setPort(secureConfig.getInt("Mail.port"));
		config.setStarttls(StartTLSOptions.REQUIRED);
		config.setUsername(secureConfig.getString("Mail.username"));
		config.setPassword(secureConfig.getString("Mail.password"));
		mailClient = MailClient.createNonShared(RestAPIService.getVertx(), config);
	}
	
	private static class MailSenderWrapper {
		public static final MailSender INSTANCE = new MailSender();
	}
	
	public void sendMail(MailMessage message) {
		mailClient.sendMail(message, result -> {
			if (!result.succeeded()) {
				System.out.println("Sending mail to " + message.getTo() + " is failed.");
			}
		});
	}
	
	public static MailSender getInstance() {
		return MailSenderWrapper.INSTANCE;
	}
	
}
