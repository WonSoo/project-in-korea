//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.Session;
import java.util.HashMap;

import kr.pik.utils.Types.AuthManager;
import kr.pik.utils.Types.FacebookAuth;
import kr.pik.utils.Types.PIKAuth;
import kr.pik.utils.database.Database;
import kr.pik.content.Account;
import org.bson.Document;

public class LoginHandler extends WebVerticle {
    private Database database;
    private Router router;
    private static HashMap<String, Account> accounts;

    public LoginHandler() {
        accounts = new HashMap<String, Account>();
    }

    private void initialize() {
        this.database = Database.getInstance();
        this.router = getRouter();
    }

    public void start() {
        this.initialize();
        this.router.post("/request/login").handler(this::requestLogin);
        this.router.post("/request/register").handler(this::requestRegister);
        this.router.get("/aaa").handler(this::checkCanRegister);
    }

    private void checkCanRegister(RoutingContext routingContext) {
        System.out.println(routingContext.currentRoute());
        if (routingContext.getCookie("register_session") != null && routingContext.session().get(routingContext.getCookie("register_session").getValue()) != null) {
            routingContext.response().setStatusCode(200);
            routingContext.next();
        } else {
            routingContext.response().setStatusCode(400);
            routingContext.response().end("�젒洹� 沅뚰븳�씠 �뾾�뒿�땲�떎.");
        }
    }

    private void requestRegister(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        JsonObject json = routingContext.getBodyAsJson();
		AuthManager authManager = null;

		String type = json.getString("account_type");

        if(type.equals("pik")) {
        	String realname = json.getString("realname");
        	String email = json.getString("email");
        	String password = json.getString("password");
        	String repassword = json.getString("repassword");
        	
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
        	String realname = json.getString("realname");
        	String email = json.getString("email");
        	String password = json.getString("password");
        	String repassword = json.getString("repassword");
        	
        	authManager = new PIKAuth(realname, email, password, repassword);
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
