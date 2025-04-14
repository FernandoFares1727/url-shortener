import { app } from './app';
import { env } from './app/config/envSchema';

const start = async () => {
  try {
    const PORT = Number(env.PORT) || 3000;
    await app.listen({
      port: PORT,
      host: '0.0.0.0'
    });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();