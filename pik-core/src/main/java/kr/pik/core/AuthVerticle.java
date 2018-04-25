//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mail.MailMessage;
import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.Session;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import kr.pik.auth.Account;
import kr.pik.auth.AuthManager;
import kr.pik.auth.FacebookAuth;
import kr.pik.auth.PIKAuth;
import kr.pik.content.Status;
import kr.pik.mail.MailSender;

public class AuthVerticle extends WebVerticle {
	private static final String EMAIL_VERIFY_KEY = "email_verify_number";
	private static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
			Pattern.CASE_INSENSITIVE);

    public void start() {
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
		JsonObject receivedMessage = routingContext.getBodyAsJson();
		String verifyNumber = receivedMessage.getString("verify_number");
		
		Session session = routingContext.session();
		if(verifyNumber.equals(session.get(EMAIL_VERIFY_KEY))) {
			response.end(Status.EMAIL_VERIFY_CHECK_SUCCESS.getJsonMessage());
			session.put("verified", true);
			return;
		};
		response.end(Status.EMAIL_VERIFY_CHECK_FAIL.getJsonMessage());
	}

	private void registerVerify(RoutingContext routingContext) {
		HttpServerResponse response = routingContext.response();
		JsonObject receivedMessage = routingContext.getBodyAsJson();
		String email = receivedMessage.getString("email");

		if (!validate(email)) {
			response.end(Status.EMAIL_VERIFY_FAIL_INVALID_EMAIL_FORMAT.getJsonMessage());
			return;
		}
		
		String randomNumber = randomNumber();
		sendMail(email, randomNumber);
		routingContext.session().put(EMAIL_VERIFY_KEY, randomNumber);
		response.end(Status.EMAIL_VERIFY_SUCCESS.getJsonMessage());
	}

	private void sendMail(String email, String randomNumber) {
		MailMessage message = new MailMessage();
		message.setFrom("Project In Korea <no-reply@project-in.kr>");
		message.setTo(email);
		message.setSubject("프로젝트 인 코리아 회원가입 인증번호 입니다.");
		message.setText("프로젝트 인 코리아 회원가입 인증번호 입니다.");
		message.setHtml("회원가입 인증번호는 " + randomNumber + " 입니다.");
		
		MailSender.getInstance().sendMail(message);
	}

    private void requestRegister(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        JsonObject json = routingContext.getBodyAsJson();

        AuthManager authManager = null;
		String type = json.getString("account_type");
        if(type.equals("pik")) {
			boolean isVerified = (boolean) routingContext.session().get("verified");
			
			if(!isVerified) {
				response.end(Status.REGISTER_FAIL_EMAIL_NOT_VERIFIED.getJsonMessage());
				response.close();
				return;
			}
			
			authManager = new PIKAuth(json.getString("name"), json.getString("email"), 
					json.getString("password"), json.getString("repassword"));

			Status register_result = authManager.register();
            response.end(register_result.getJsonMessage());
    		return;
        } else{
        	response.end(Status.LOGIN_FAIL_UNKNOWN_ACCOUNT_TYPE.getJsonMessage());
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
        HttpServerResponse response = routingContext.response();
        JsonObject json = routingContext.getBodyAsJson();
		AuthManager authManager = null;
		
		Account account = null;
		String type = json.getString("account_type");
        if(type.equals("pik")) {
        	authManager = new PIKAuth(json.getString("email"), json.getString("password"));
        	account = authManager.login();
        }
        else if(type.equals("facebook"))
        {
        	authManager = new FacebookAuth(json.getString("accessToken"));
        	account = authManager.login();
        } else{
        	response.end(Status.LOGIN_FAIL_UNKNOWN_ACCOUNT_TYPE.getJsonMessage());
        	return;
        }

    	if(account.getStatus().isSuccess())
    		addLoginCookie(routingContext, account);

    	response.end(account.getStatus().getJsonMessage());
    	return;
    }
}
