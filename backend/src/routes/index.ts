import { Router } from 'express';
import routerUser from './router-user';
// import routerQuest from "./router-quest";
// import routerNotice from "./router-notice";
// import routerGuild from "./router-guild";
// import routerGuildQuest from "./router-guild-quest";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use(routerUser);
// baseRouter.use(routerQuest);
// baseRouter.use(routerNotice);
// baseRouter.use(routerGuild);
// baseRouter.use(routerGuildQuest);

// Export default.
export default baseRouter;
