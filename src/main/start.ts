import './config/module-alias';
import { app } from './config/app';
import { container } from './di/container';

const loggerProvider = container.resolve('loggerProvider');

app.listen(3334, () =>
  loggerProvider.info('🔥🔥🔥 Server started at http://0.0.0.0:3334 🔥🔥🔥'),
);
