package kr.pik.sql;

public class FactorySQLDialect {
	public enum Dialect {
		Recruit, AboutMe, Auth
	}

	public static SQLDialect createSQLDialect(Dialect dialect) {
		return new SQLDialect(dialect.toString());
	}
}
