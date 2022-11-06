import 'dotenv/config';
import logger from 'jet-logger';
import server from './server';

// Constants
let port: number = 3001;
if (Number(process.env.PORT).toString() !== 'NaN') {
  port = Number(process.env.PORT);
}

// Start server
server.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
