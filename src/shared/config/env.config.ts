import { EnvModel } from '../model/env.model';

/**
 * Env config
 */
export default (): EnvModel => ({
  port: parseInt(process.env.OPEN_AI_PORT, 10) || 3000,
  appName: process.env.OPEN_AI_APP_NAME,
  apiKey: process.env.OPENAI_API_KEY,
});
