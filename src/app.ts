import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { DashboardController } from './controllers/dashboard.controller';
import { SectionDetailsController } from './controllers/section.details.controller';
import { ReportController } from './controllers/report.controller';
import { InterviewController } from './controllers/interview.controller';

class App {
  app: express.Express;

  constructor() {
    const app = this.app = express();

    this.addMiddlewares(app);
    this.registerRoutes(app);
  }

  addMiddlewares(app: express.Express) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
  }

  /**
   * Routes:
   *    GET:
   *      /sections
   *      /sections/:id
   *      /sections/:id/questions/:id
   *      /sections/:id/report
   *    POST:
   *      /sections/:id
   */
  registerRoutes(app: express.Express) {
    const router = express.Router()

    new InterviewController(router);
    new ReportController(router);
    new SectionDetailsController(router);
    new DashboardController(router);

    this.registerEmptyRoute(router);

    app.use('/', router);
  }

  registerEmptyRoute(router: Router) {
    router.get('/', (req, res) => {
      res.json({
        message: 'Rostyslav!'
      });
    });
  }
}

export default new App().app;
