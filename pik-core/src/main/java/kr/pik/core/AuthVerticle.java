//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mail.MailMessage;
import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.Session;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.protobuf.InvalidProtocolBufferException;

import kr.pik.auth.Account;
import kr.pik.auth.AuthManager;
import kr.pik.auth.FacebookAuth;
import kr.pik.auth.PIKAuth;
import kr.pik.content.Status;
import kr.pik.mail.MailSender;
import kr.pik.message.Auth.LoginMessage;
import kr.pik.message.Auth.LoginMessage.EmailLoginMessage;
import kr.pik.message.Auth.LoginMessage.FacebookLoginMessage;
import kr.pik.message.Auth.LoginMessage.LoginMethodCase;
import kr.pik.message.Auth.RegisterMessage;
import kr.pik.message.Auth.RegisterMessage.EmailRegisterMessage;
import kr.pik.message.Auth.RegisterMessage.RegisterMethodCase;
import kr.pik.utils.database.SecureConfig;
import kr.pik.message.Auth.RegisterVerifyCheckMessage;
import kr.pik.message.Auth.RegisterVerifyMessage;

public class AuthVerticle extends WebVerticle {
	private static final String EMAIL_VERIFY_KEY = "email_verify_number";
	private static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern
			.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

	@Override
	public void start() throws Exception {
		router.post("/api/login").handler(this::requestLogin);
		router.post("/api/register").handler(this::requestRegister);
		router.post("/api/register_verify").handler(this::registerVerify);
		router.post("/api/register_verify_check").handler(this::registerVerifyCheck);
	}

	public static boolean validate(String emailStr) {
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
		return matcher.find();
	}

	private String randomNumber() {
		Random rand = new Random();
		int random = rand.nextInt(999999) + 1;

		return Integer.toString(random);
	}

	private void registerVerifyCheck(RoutingContext routingContext) {
		HttpServerResponse response = routingContext.response();

		byte[] bytes = routingContext.getBody().getBytes();
		RegisterVerifyCheckMessage requestMessage = null;
		try {
			requestMessage = RegisterVerifyCheckMessage.newBuilder().mergeFrom(bytes).build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String verifyNumber = requestMessage.getVerifyNumber();
		Session session = routingContext.session();

		if (verifyNumber.equals(session.get(EMAIL_VERIFY_KEY))) {
			response.end(Status.EMAIL_VERIFY_CHECK_SUCCESS.toBuffer());
			session.put("verified", true);
			return;
		}
		response.end(Status.EMAIL_VERIFY_CHECK_FAIL.toBuffer());
	}

	private void registerVerify(RoutingContext routingContext) {
		HttpServerResponse response = routingContext.response();

		byte[] bytes = routingContext.getBody().getBytes();
		RegisterVerifyMessage requestMessage = null;
		try {
			requestMessage = RegisterVerifyMessage.newBuilder().mergeFrom(bytes).build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String email = requestMessage.getEmail();
		if (!validate(email)) {
			response.end(Status.EMAIL_VERIFY_FAIL_INVALID_EMAIL_FORMAT.toBuffer());
			return;
		}

		String randomNumber = randomNumber();
		sendMail(email, randomNumber);
		routingContext.session().put(EMAIL_VERIFY_KEY, randomNumber);
		response.end(Status.EMAIL_VERIFY_SUCCESS.toBuffer());
	}

	private void sendMail(String email, String randomNumber) {
		MailMessage message = new MailMessage();
		message.setFrom("Project In Korea <no-reply@project-in.kr>");
		message.setTo(email);
		message.setSubject("프로젝트 인 코리아 회원가입 인증번호 입니다.");
		message.setText("프로젝트 인 코리아 회원가입 인증번호 입니다.");
		message.setHtml("<head>\r\n"
				+ "<link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>\r\n"
				+ "</head>\r\n" + "<body style=\"width:600px\">\r\n"
				+ "<img src=\"https://imgur.com/nHUmKhp.png\"/>\r\n"
				+ "<div style=\"margin:7% auto;font-family:'Lato',sans-serif;text-align:center\">\r\n"
				+ "<div style=\"font-size:14px;letter-spacing:1px;margin:-2px 0 45px\">\r\n"
				+ "<p>프로젝트 인 코리아 회원가입에 감사드립니다.</p>\r\n" + "<p>회원가입 인증번호는 아래와 같습니다.</p>\r\n" + "</div>\r\n"
				+ "<div style=\"font-size:20px\">\r\n" + "<p>" + randomNumber + "</p>\r\n" + "</div>\r\n" + "</div>\r\n"
				+ "<div style=\"margin:5% auto;font-family:'Lato',sans-serif;background:#eaeaea;text-align:center\">\r\n"
				+ "<div style=\"font-size:10px;letter-spacing:1px;padding:10px\">\r\n"
				+ "<p>COPYRIGHT © 2018 By PROJECT IN KOREA., LTD. ALL RIGHTS RESERVED</p>\r\n" + "</div>\r\n"
				+ "</div>\r\n" + "</body>");

		MailSender.getInstance().sendMail(message);
	}

	private void requestRegister(RoutingContext routingContext) {
		HttpServerResponse response = routingContext.response();

		byte[] bytes = routingContext.getBody().getBytes();
		RegisterMessage requestMessage = null;
		try {
			requestMessage = RegisterMessage.newBuilder().mergeFrom(bytes).build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		AuthManager authManager = null;
		RegisterMethodCase type = requestMessage.getRegisterMethodCase();
		if (type.equals(RegisterMethodCase.EMAILREGISTER)) {
			boolean isVerified = (boolean) routingContext.session().get("verified");

			if (!isVerified) {
				response.end(Status.REGISTER_FAIL_EMAIL_NOT_VERIFIED.toBuffer());
				response.close();
				return;
			}
			EmailRegisterMessage emailLogin = requestMessage.getEmailRegister();

			authManager = new PIKAuth(emailLogin.getEmail(), emailLogin.getPassword(), emailLogin.getName());

			Status register_result = authManager.register();
			response.end(register_result.toBuffer());
			return;
		} else {
			response.end(Status.LOGIN_FAIL_UNKNOWN_ACCOUNT_TYPE.toBuffer());
		}
	}

	private void addLoginCookie(RoutingContext routingContext, Account account) {
		String accountKey = Integer.toString(account.hashCode());
		routingContext.session().put(accountKey, account);
		Cookie cookie = Cookie.cookie(LOGIN_COOKIE, accountKey);
		cookie.setPath("/");
		routingContext.addCookie(cookie);
	}

	private void requestLogin(RoutingContext routingContext) {
		System.out.println("requestLogin() called.");
		HttpServerResponse response = routingContext.response();

		byte[] bytes = routingContext.getBody().getBytes();
		LoginMessage requestMessage = null;
		try {
			requestMessage = LoginMessage.newBuilder().mergeFrom(bytes).build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		AuthManager authManager = null;

		Account account = null;
		LoginMethodCase type = requestMessage.getLoginMethodCase();
		if (type == LoginMethodCase.EMAILLOGIN) {
			EmailLoginMessage emailMessage = requestMessage.getEmailLogin();
			authManager = new PIKAuth(emailMessage.getEmail(), emailMessage.getPassword());
			account = authManager.login();
		} else if (type == LoginMethodCase.FACEBOOKLOGIN) {
			FacebookLoginMessage facebookMessage = requestMessage.getFacebookLogin();
			authManager = new FacebookAuth(facebookMessage.getToken());
			account = authManager.login();
		} else {
			response.end(Status.LOGIN_FAIL_UNKNOWN_ACCOUNT_TYPE.toBuffer());
			return;
		}

		if (account.getStatus().isSuccess()) {
			System.out.println("login cookie added");
			addLoginCookie(routingContext, account);
			System.out.println(routingContext.getCookie(LOGIN_COOKIE));
		}

		response.end(account.getStatus().toBuffer());
		return;
	}

	public static Account getAccountInfo(RoutingContext context) {
		if (context.getCookie(LOGIN_COOKIE) != null) {
			Account account = context.session().get(context.getCookie(LOGIN_COOKIE).getValue());
			return account;
		}
		return null;
	}
}
