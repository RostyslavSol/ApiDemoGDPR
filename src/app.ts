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
   *      /section/:id
   *      /section/:id/question/:id
   *      /section/:id/report
   *    POST:
   *      /section/:id
   */
  registerRoutes(app: express.Express) {
    app.use('/section/:sectionId/question/:questionId', new InterviewController().getRouter());
    app.use('/section/:sectionId/report', new ReportController().getRouter())
    app.use('/section/:sectionId', new SectionDetailsController().getRouter())
    app.use('/sections', new DashboardController().getRouter());
    app.use('/', this.getEmptyRouter());
  }

  getEmptyRouter(): Router {
    const router = express.Router()

    router.get('/', (req, res) => {
      res.json({
        message: 'Rostyslav!'
      });
    });

    return router;
  }
}

export default new App().app;
