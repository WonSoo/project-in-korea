//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mail.MailClient;
import io.vertx.ext.mail.MailConfig;
import io.vertx.ext.mail.MailMessage;
import io.vertx.ext.mail.StartTLSOptions;
import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.Session;
import java.util.HashMap;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import kr.pik.utils.Types.AuthManager;
import kr.pik.utils.Types.FacebookAuth;
import kr.pik.utils.Types.PIKAuth;
import kr.pik.utils.database.Database;
import kr.pik.utils.database.SecureConfig;
import kr.pik.content.Account;
import org.bson.Document;

public class LoginHandler extends WebVerticle {
    private Database database;
    private Router router;
    private static HashMap<String, Account> accounts;
	private MailClient mailClient;
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
			Pattern.CASE_INSENSITIVE);
	private SecureConfig SecureConfig;

    public LoginHandler() {
        accounts = new HashMap<String, Account>();
    }

    private void initialize() {
        this.database = Database.getInstance();
        this.router = getRouter();
        SecureConfig = SecureConfig.getInstance();
        
		MailConfig config = new MailConfig();
		System.out.println("Mail.host: " + SecureConfig.getString("Mail.host"));
		System.out.println("Mail.port: " + SecureConfig.getString("Mail.port"));
		System.out.println("Mail.username: " + SecureConfig.getString("Mail.username"));
		System.out.println("Mail.password: " + SecureConfig.getString("Mail.password"));
		
		
		config.setHostname(SecureConfig.getString("Mail.host"));
		config.setPort(SecureConfig.getInt("Mail.port"));
		config.setStarttls(StartTLSOptions.REQUIRED);
		config.setUsername(SecureConfig.getString("Mail.username"));
		config.setPassword(SecureConfig.getString("Mail.password"));
		mailClient = MailClient.createNonShared(vertx, config);
    }

    public void start() {
        this.initialize();
        this.router.post("/api/login").handler(this::requestLogin);
        this.router.post("/api/register").handler(this::requestRegister);
        this.router.post("/api/register_verify").handler(this::registerVerify);
        this.router.post("/api/register_verify_check").handler(this::registerVerifyCheck);
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
		System.out.println("verify_number from client Received: " + verifyNumber);
		System.out.println("verify_number from session: " + session.get("verifyNumber"));
		if(verifyNumber.equals(session.get("verifyNumber"))) {
			response.setStatusMessage("verify success");
			response.setStatusCode(200);
			response.end("verify success");
			session.put("verified", true);
			return;
		};
		response.setStatusMessage("verify failed.");
		response.setStatusCode(400);
		response.end("verify failed.");
	}

	private void registerVerify(RoutingContext routingContext) {
		HttpServerResponse response = routingContext.response();
		JsonObject receivedMessage = routingContext.getBodyAsJson();
		String email = receivedMessage.getString("email");

		if (!validate(email)) {
			response.setStatusMessage("Invalid email format");
			response.setStatusCode(400);
			response.end("Invalid email format");
			return;
		}
		String randomNumber = randomNumber();
		sendMail(email, randomNumber);
		routingContext.session().put("verifyNumber", randomNumber);
		response.setStatusCode(200);
		response.setStatusMessage("Email sended");
		response.end("Email Sended");
	}

	private void sendMail(String email, String randomNumber) {
		MailMessage message = new MailMessage();
		message.setFrom("auth_verify@project-in.kr");
		message.setCc("Project In Korea <auth_verify@project-in.kr>");
		message.setTo(email);
		message.setSubject("프로젝트 인 코리아 회원가입 인증번호 입니다.");
		message.setText("프로젝트 인 코리아 회원가입 인증번호 입니다.");
		message.setHtml("회원가입 인증번호는 " + randomNumber + " 입니다.");

		mailClient.sendMail(message, result -> {
			if (result.succeeded()) {
				System.out.println(email + randomNumber + "mail sended. ");
				System.out.println(result.result());
			} else {
				result.cause().printStackTrace();
			}
		});
	}

    private void requestRegister(RoutingContext routingContext) {
    	System.out.println(routingContext);
        HttpServerResponse response = routingContext.response();
        JsonObject json = routingContext.getBodyAsJson();
		AuthManager authManager = null;

		String type = json.getString("account_type");
		if(type == null) {
			response.setStatusCode(400);
			response.setStatusMessage("Bad account_type");
			response.end();
			response.close();
		} else {
	        if(type.equals("pik")) {
	        	String realname = json.getString("realname");
	        	String email = json.getString("email");
	        	String password = json.getString("password");
	        	String repassword = json.getString("repassword");
	        	
				boolean isVerified = (boolean) routingContext.session().get("verified");
				
				if(!isVerified) {
					response.setStatusCode(400);
					response.setStatusMessage("user is not verified");
					response.end("user is not verified");
					response.close();
					return;
				}
	        	
	        	authManager = new PIKAuth(realname, email, password, repassword);
	        	boolean register_result = authManager.register();
	        	if(register_result)
	        	{
	                Session register_session = routingContext.session();
	                register_session.put(register_session.id(), authManager);
	                Cookie cookie = Cookie.cookie("login_session", register_session.id());
	                cookie.setPath("/");
	                routingContext.addCookie(cookie);
	                
	                response.setStatusCode(200);
	                response.setStatusMessage("회원가입에 성공했습니다.");
	                response.end("Registered Successfully.");
	                response.close();
	        	} else{
	        		response.setStatusCode(400);
	        		response.setStatusMessage("회원가입에 실패하셨습니다.");
	        		response.end("Register failed.");
	        		response.close();
	        	}
	        } else{
	        	response.setStatusCode(400);
	        	response.setStatusMessage("회원가입에 실패하셨습니다. 알 수 없는 회원가입 타입입니다.");
	        	response.end("Register failed.");
	        	response.close();
	        }
		}
    }

    public static String getIdFromAccessToken(String accessToken)
    {
        return accounts.get(accessToken).getId();
    }

    private void requestLogin(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        JsonObject json = routingContext.getBodyAsJson();
		AuthManager authManager = null;
		String type = json.getString("account_type");

        if(type.equals("pik")) {
        	String email = json.getString("email");
        	String password = json.getString("password");
        	
        	authManager = new PIKAuth(null, email, password, null);
        	Document login_result = authManager.login();
        	if(login_result != null)
        	{
                Session login_session = routingContext.session();
                login_session.put(login_session.id(), authManager);
                Cookie cookie = Cookie.cookie("login_session", login_session.id());
                cookie.setPath("/");
                routingContext.addCookie(cookie);
                
                response.setStatusCode(200);
                response.setStatusMessage("로그인에 성공했습니다.");
                response.end("logined Successfully.");
                response.close();
        	} else{
        		response.setStatusCode(400);
        		response.setStatusMessage("로그인에 실패하셨습니다.");
        		response.end("login failed.");
        		response.close();
        	}
        }
        else if(type.equals("facebook"))
        {
        	String accessToken = json.getString("accessToken");
        	authManager = new FacebookAuth(accessToken);
        	Document login_result = authManager.login();
        	
        	if(login_result != null) {
                Session login_session = routingContext.session();
                login_session.put(login_session.id(), accessToken);
                Cookie cookie = Cookie.cookie("login_session", login_session.id());
                cookie.setPath("/");
                response.setStatusCode(200);
                routingContext.addCookie(cookie);

                response.setStatusMessage("로그인에 성공했습니다.");
                response.end("logined Successfully.");
                response.close();
        	} else{
        		response.setStatusCode(400);
        		response.setStatusMessage("로그인에 실패하셨습니다.");
        		response.end("login failed.");
        		response.close();
        	}
        } else{
        	response.setStatusCode(400);
        	response.setStatusMessage("로그인에 실패하셨습니다. 알 수 없는 로그인 타입입니다.");
        	response.end("login failed.");
        	response.close();
        }
    }

    private boolean checkRegistered(String id) {
        return this.database.isExist("accounts", "id", id);
    }

    private void createAccount(String id, String name) {
        Document account = (new Document("id", id)).append("name", name);
        this.database.insert("accounts", account);
        System.out.println("account created: " + name);
    }
}
