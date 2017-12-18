//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.utils.database;

import java.io.File;
import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.XMLConfiguration;
import org.apache.commons.configuration2.builder.BuilderParameters;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.ex.ConfigurationException;

public enum SecureConfig {
    INSTANCE;

    private Configuration config;
    private String CONFIG_FILENAME = "SecureConfig.xml";
    private String CONFIG_PATH;

    private SecureConfig() {
        this.CONFIG_PATH = SecureConfig.class.getClassLoader().getResource("conf").getPath() + "/" + this.CONFIG_FILENAME;
        Parameters params = new Parameters();
        File xmlFile = new File(this.CONFIG_PATH);
        FileBasedConfigurationBuilder builder = (new FileBasedConfigurationBuilder(XMLConfiguration.class)).configure(new BuilderParameters[]{(BuilderParameters)params.fileBased().setFile(xmlFile)});

        try {
            this.config = (Configuration)builder.getConfiguration();
        } catch (ConfigurationException var7) {
            var7.printStackTrace();
        }

    }

    public String getString(String key) {
        return this.config.getString(key);
    }

    public int getInt(String key) {
        return this.config.getInt(key);
    }

    public static SecureConfig getInstance() {
        return INSTANCE;
    }
}
