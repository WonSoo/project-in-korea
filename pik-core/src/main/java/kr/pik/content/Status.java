package kr.pik.content;

import org.bson.Document;

public enum Status {
	PERMISSION_DENIED(false, "������ �����մϴ�."),
	PERMISSION_DENIED_AUTH_NEED(false, "�α����� �ʿ��մϴ�."),
	
	LOGIN_SUCCESS(true, "�α��ο� �����߽��ϴ�."),
	LOGIN_FAIL(true, "�α��ο� �����߽��ϴ�."),
	LOGIN_FAIL_UNKNOWN_USER(true, "������ ã�� ���߽��ϴ�."),
	LOGIN_FAIL_UNKNOWN_ACCOUNT_TYPE(false, "�߸��� ���� Ÿ���Դϴ�."),
	LOGIN_FAIL_INVALID_PASSWORD(false, "�߸��� ��й�ȣ�Դϴ�."),

	FILE_SAVE_SUCCESS(true, "���������� ������ ����Ǿ����ϴ�."),
	FILE_SAVE_FAIL(true, "���� ������ �����߽��ϴ�.."),

	EMAIL_VERIFY_SUCCESS(true, "�̸��� ������ �����߽��ϴ�."),
	EMAIL_VERIFY_FAIL_INVALID_EMAIL_FORMAT(false, "�߸��� �̸��� �����Դϴ�."),
	
	EMAIL_VERIFY_CHECK_SUCCESS(true, "�̸��� ������ �����߽��ϴ�."),
	EMAIL_VERIFY_CHECK_FAIL(false, "."),
	
	REGISTER_SUCCESS(true, "ȸ�����Կ� �����߽��ϴ�."),
	REGISTER_FAIL(false, "ȸ�����Կ� �����߽��ϴ�."),
	REGISTER_FAIL_EMAIL_NOT_VERIFIED(false, "�̸��������� ���� �ʾҽ��ϴ�."),

	REGISTER_FAIL_INVALID_REPASSWORD(false, "���Է��� ��й�ȣ�� �߸��Ǿ����ϴ�."),
	REGISTER_FAIL_EXIST_USER(false, "�̹� �����ϴ� �����Դϴ�."),
	
	RECRUIT_ALREADY_APPLIED(false, "�̹� �����ۿ� ��û�ϼ̽��ϴ�."),
	RECRUIT_APPLY_SUCCESS(true, "���� ��û�� �����ϼ̽��ϴ�."), RECRUIT_APPLY_PROCESS_SUCCESS(true, "����"), RECRUIT_APPLY_PROCESS_FAIL(false, "�̹� ó���� ��û�Դϴ�."), COMMENT_SUCCESS(true, "��� �ۼ� �Ϸ�"),
	
	;
	
	final private boolean isSuccess;
    final private String message;
    
    private Status(boolean isSuccess, String message) { //enum���� ������ ���� ����
    	this.isSuccess = isSuccess;
        this.message = message;
    }
    
    public String getJsonMessage() {
    	Document doc = new Document();
    	doc.put("isSuccess", isSuccess);
    	doc.put("message", message);
    	
    	return doc.toJson();
    }
    
    public boolean isSuccess() {
    	return isSuccess;
    }
    
    public String getMessage() { // ���ڸ� �޾ƿ��� �Լ�
        return message;
    }
    
    public Document addErrorMessage(Document source) {
    	Document doc = new Document(source);
    	doc.put("isSuccess", isSuccess);
    	doc.put("message", message);
    	return doc;
    }
    
    
}
