import './config/module-alias';
import { app } from './config/app';
import { container } from './di/container';

const loggerGateway = container.resolve('loggerGateway');

app.listen(3334, () =>
  loggerGateway.info('🔥🔥🔥 Server started at http://0.0.0.0:3334 🔥🔥🔥'),
);
