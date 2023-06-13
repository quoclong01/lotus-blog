import { PageRoute } from './core/modules/custom-router-dom/router.interface';
import pageRoutes from './pages/page.routes';
import authRoutes from './auth/auth.routes';
import errorRoutes from './pages/error/error.routes';

const appRoutes: PageRoute[] = [
  ...pageRoutes,
  ...authRoutes,
  ...errorRoutes
];

export default appRoutes;
