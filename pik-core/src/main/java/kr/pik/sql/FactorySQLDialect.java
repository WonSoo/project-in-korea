package kr.pik.sql;

public class FactorySQLDialect {
	private static class FactorySQLDialectWrapper {
		private static final FactorySQLDialect INSTANCE = new FactorySQLDialect();

		private static final SQLDialect recruitDialect = new SQLDialect(Dialect.Recruit.toString());
		private static final SQLDialect aboutMeDialect = new SQLDialect(Dialect.AboutMe.toString());
		private static final SQLDialect authDialect = new SQLDialect(Dialect.Auth.toString());
	}
	public enum Dialect {
		Recruit, AboutMe, Auth
	}
	
	public static SQLDialect createSQLDialect(Dialect dialect) {
		switch (dialect) {
		case Recruit:
			return FactorySQLDialectWrapper.recruitDialect;
		case AboutMe:
			return FactorySQLDialectWrapper.aboutMeDialect;
		case Auth:
			return FactorySQLDialectWrapper.authDialect;
		default:
			return null;
		}
	}
	
	public static FactorySQLDialect getInstance() {
		return FactorySQLDialectWrapper.INSTANCE;
	}
}
