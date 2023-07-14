import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CowRoutes } from '../modules/cow/cow.route';
const router = express.Router();

// Defining an array of module routes to be mounted on the router
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
];

// Iterate over the moduleRoutes array and mount each route on the router
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
