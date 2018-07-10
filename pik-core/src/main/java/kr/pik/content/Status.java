package kr.pik.content;

import org.bson.Document;

import io.vertx.core.buffer.Buffer;
import kr.pik.message.Status.ResponseStatusMessage;

public enum Status {
	PERMISSION_DENIED(false, "권한이 부족합니다."),
	PERMISSION_DENIED_AUTH_NEED(false, "로그인이 필요합니다."),
	
	LOGIN_SUCCESS(true, "로그인에 성공했습니다."),
	LOGIN_FAIL(true, "로그인에 실패했습니다."),
	LOGIN_FAIL_UNKNOWN_USER(true, "유저를 찾지 못했습니다."),
	LOGIN_FAIL_UNKNOWN_ACCOUNT_TYPE(false, "잘못된 계정 타입입니다."),
	LOGIN_FAIL_INVALID_PASSWORD(false, "잘못된 비밀번호입니다."),

	FILE_SAVE_SUCCESS(true, "성공적으로 파일이 저장되었습니다."),
	FILE_SAVE_FAIL(true, "파일 저장이 실패했습니다.."),

	EMAIL_VERIFY_SUCCESS(true, "이메일 인증에 성공했습니다."),
	EMAIL_VERIFY_FAIL_INVALID_EMAIL_FORMAT(false, "잘못된 이메일 형식입니다."),
	
	EMAIL_VERIFY_CHECK_SUCCESS(true, "이메일 인증에 성공했습니다."),
	EMAIL_VERIFY_CHECK_FAIL(false, "잘못된 이메일 인증번호입니다."),
	
	REGISTER_SUCCESS(true, "회원가입에 성공했습니다."),
	REGISTER_FAIL(false, "회원가입에 실패했습니다."),
	REGISTER_FAIL_EMAIL_NOT_VERIFIED(false, "이메일인증을 받지 않았습니다."),

	REGISTER_FAIL_INVALID_REPASSWORD(false, "재입력한 비밀번호가 잘못되었습니다."),
	REGISTER_FAIL_EXIST_USER(false, "이미 존재하는 계정입니다."),
	
	RECRUIT_ALREADY_APPLIED(false, "이미 모집글에 신청하셨습니다."),
	RECRUIT_APPLY_SUCCESS(true, "모집 신청에 성공하셨습니다."), RECRUIT_APPLY_PROCESS_SUCCESS(true, "성공"), RECRUIT_APPLY_PROCESS_FAIL(false, "이미 처리된 요청입니다."), COMMENT_SUCCESS(true, "댓글 작성 완료"), RECRUIT_ADD_RECRUIT_SUCCESS(true, "글 작성에 성공하셨습니다."), RECRUIT_GET_ID_NULL(false, "ID가 NULL입니다."), PROFILE_UPDATE_SUCCESS(true, "프로필 업데이트에 성공하셨습니다."),
	
	;
	
	final private boolean isSuccess;
    final private String message;
    
    private Status(boolean isSuccess, String message) { //enum에서 생성자 같은 역할
    	this.isSuccess = isSuccess;
        this.message = message;
    }
    
    public Buffer toBuffer() {
    	return Buffer.buffer(ResponseStatusMessage.newBuilder().setIsSuccess(isSuccess).setMessage(message).build().toByteArray());
    }
    
    public boolean isSuccess() {
    	return isSuccess;
    }
    
    public String getMessage() { // 문자를 받아오는 함수
        return message;
    }
    
    public Document addStatusMessage(Document source) {
    	Document doc = new Document(source);
    	doc.put("isSuccess", isSuccess);
    	doc.put("message", message);
    	return doc;
    }
    
    
}
