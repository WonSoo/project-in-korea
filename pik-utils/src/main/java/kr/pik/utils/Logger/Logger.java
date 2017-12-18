//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.utils.Logger;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;

public enum Logger {
    INSTANCE;

    private org.apache.logging.log4j.Logger logger;
    private String LOGGER_CONFIG_PATH = Logger.class.getClassLoader().getResource("log4j2.xml").toString();

    private Logger() {
        System.setProperty("log4j.configurationFile", this.LOGGER_CONFIG_PATH);
        this.logger = LogManager.getLogger("logger");
    }

    public void log(String level, String message) {
        this.logger.log(Level.toLevel(level), message);
    }

    public org.apache.logging.log4j.Logger getLogger() {
        return LogManager.getLogger();
    }

    public org.apache.logging.log4j.Logger getLogger(String name) {
        return LogManager.getLogger(name);
    }

    public static Logger getInstance() {
        return INSTANCE;
    }
}
