import 'dotenv/config';
import logger from 'jet-logger';
import server from './server';

// Constants
const port = process.env.APP_PORT || 3001;

// Start server
server.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
