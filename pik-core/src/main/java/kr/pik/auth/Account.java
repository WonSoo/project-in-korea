//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.auth;

import kr.pik.content.Status;

public class Account {
	private Status status;
	
	private AccountType accountType;
	
    private String name;
    private String id;
    private String email;
    
    public Account(AccountType accountType, String name, String email) {
    	this.accountType = accountType;
    	this.name = name;
    	this.email = email;
    }
    
    public Account(Status status) {
    	this.status = status;
	}


	public AccountType getAccountType() {
		return accountType;
	}


	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setId(String id) {
		this.id = id;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getName() {
        return this.name;
    }

    public String getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

	public Status getStatus() {
		return status;
	}
}
