package kr.pik.sql;

public class FactorySQLDialect {
	private static class FactorySQLDialectWrapper {
		private static final FactorySQLDialect INSTANCE = new FactorySQLDialect();

		public static final SQLDialect recruitDialect = new SQLDialect(Dialect.Recruit.toString());
		public static final SQLDialect aboutMeDialect = new SQLDialect(Dialect.AboutMe.toString());
		public static final SQLDialect authDialect = new SQLDialect(Dialect.Auth.toString());
		public static final SQLDialect applyDialect = new SQLDialect(Dialect.Apply.toString());
		public static final SQLDialect commentDialect = new SQLDialect(Dialect.Comment.toString());
		public static final SQLDialect profileDialect = new SQLDialect(Dialect.Profile.toString());
	}
	public enum Dialect {
		Recruit, AboutMe, Auth, Apply, Comment, Profile, HowMe
	}
	
	//We can use it by access directly to variables;
	public static SQLDialect createSQLDialect(Dialect dialect) {
		switch (dialect) {
		case Recruit:
			return FactorySQLDialectWrapper.recruitDialect;
		case AboutMe:
			return FactorySQLDialectWrapper.aboutMeDialect;
		case Auth:
			return FactorySQLDialectWrapper.authDialect;
		case Apply:
			return FactorySQLDialectWrapper.applyDialect;
		case Comment:
			return FactorySQLDialectWrapper.commentDialect;
		case Profile:
			return FactorySQLDialectWrapper.profileDialect;
		default:
			return null;
		}
	}
	
	public static FactorySQLDialect getInstance() {
		return FactorySQLDialectWrapper.INSTANCE;
	}
}
