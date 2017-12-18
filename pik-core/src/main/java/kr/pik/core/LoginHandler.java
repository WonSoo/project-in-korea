//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import com.google.gson.Gson;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.Session;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.util.HashMap;

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
        this.router.post("/request/register").handler(this::register);
        this.router.get("/aaa").handler(this::checkCanRegister);
    }

    private void checkCanRegister(RoutingContext routingContext) {
        System.out.println(routingContext.currentRoute());
        if (routingContext.getCookie("register_session") != null && routingContext.session().get(routingContext.getCookie("register_session").getValue()) != null) {
            routingContext.response().setStatusCode(200);
            routingContext.next();
        } else {
            routingContext.response().setStatusCode(400);
            routingContext.response().end("접근 권한이 없습니다.");
        }
    }

    private void register(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        JsonObject json = routingContext.getBodyAsJson();

        String type = json.getString("type");
        if(type.equals("facebook"))
        {
            String accessToken = json.getString("accessToken");
            try {
                InputStream input = (new URL("https://graph.facebook.com/me?access_token=" + accessToken)).openStream();
                Reader reader = new InputStreamReader(input, "UTF-8");
                Account account = (Account)(new Gson()).fromJson(reader, Account.class);
                Session register_session = routingContext.session();
                register_session.put(register_session.id(), accessToken);
                Cookie cookie = Cookie.cookie("register_session", register_session.id());
                cookie.setPath("/");
                response.setStatusCode(200);
                routingContext.addCookie(cookie);
                JsonObject response_json = new JsonObject();
                response_json.put("email", account.getEmail());
                routingContext.reroute("/register");
                response.end(response_json.toString());
            } catch (IOException var11) {
                var11.printStackTrace();
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
        String type = json.getString("type");
        if(type.equals("facebook"))
        {
            String accessToken = json.getString("accessToken");
            try {
                InputStream input = (new URL("https://graph.facebook.com/me?type=email,name,picture&access_token=" + accessToken)).openStream();
                Reader reader = new InputStreamReader(input, "UTF-8");
                Account account = (Account)(new Gson()).fromJson(reader, Account.class);
                accounts.put(accessToken, account);
                JsonObject sendInform = new JsonObject();
                sendInform.put("email", account.getEmail());
                sendInform.put("name", account.getName());
                if (!this.checkRegistered(account.getId())) {
//                    response.setStatusCode(500);
//                    response.setStatusMessage("로그인하신 페이스북 아이디는 프인코 회원으로 가입되지 않았습니다. 회원가입 페이지로 이동합니다.");
//                } else {
                    Document doc = new Document("type", "facebook").append("id", account.getId());
                    this.database.insert("accounts", doc);
                    System.out.println(account.getId()+" created");
                }

                response.setStatusCode(200);
                response.setStatusMessage("로그인 되셨습니다.");

                Session login_session = routingContext.session();
                login_session.put(login_session.id(), accessToken);
                Cookie cookie = Cookie.cookie("login_session", login_session.id());
                cookie.setPath("/");
                response.setStatusCode(200);
                routingContext.addCookie(cookie);

                response.end(sendInform.toString());
            } catch (IOException var9) {
                response.setStatusCode(400);
                response.setStatusMessage("accessToken is invalid");
            }
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
