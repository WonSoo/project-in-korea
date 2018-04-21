//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core.auth;

public class Account {
	private AccountType accountType;
	
    private String name;
    private String id;
    private String email;

    public Account(AccountType accoutType, String name, String id, String email) {
    	this.accountType = accountType;
    	this.name = name;
    	this.id = id;
    	this.email = email;
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



	public String getName() {
        return this.name;
    }

    public String getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }
}
