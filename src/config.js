const logger = require('./logger');
const fs = require('fs');
const joi = require('joi');

class ConfigReader {
    constructor() {
        this.configFilePath = null;
        this.config = null;
    }

    read(configFilePath) {
        this.configFilePath = configFilePath;

        logger.title('CONFIGURATION');
        logger.log(`Attempting to load config file ${configFilePath}`);

        return new Promise((resolve, reject) => {
            fs.readFile(this.configFilePath, (error, data) => {
                if (error) {
                    reject(`A problem occured when reading config: ${error}`);
                    return;
                }

                try {
                    this.config = JSON.parse(data);
                } catch (e) {
                    reject(`Config error: ${e}`);
                    return;
                }

                logger.success(`Loaded config`);
                const configCheckResult = this.check();

                if (configCheckResult.length > 0) {
                    const errors = configCheckResult.map((e) => `[${e.path}] ${e.message}`);
                    reject(`${configCheckResult.length} errors in the config:\n- ${errors.join('\n- ')}`);
                } else {
                    logger.success('Config OK');
                    resolve(this.config);
                }
            });
        });
    }

    check() {
        let errors = [];

        const schema = joi.object().options({ abortEarly: false, allowUnknown: true }).keys({
            rust_server: joi.object().required().keys({
                host: joi.string().required(),
                webrcon_port: joi.number().min(0).max(65535),
                webrcon_password: joi.string().required(),
                reconnect_interval: joi.number().required()
            })
        });

        joi.validate(this.config, schema, (err, value) => {
            if (!err) return errors;
            errors = err.details;
        });

        return errors;
    }
}

module.exports = ConfigReader;