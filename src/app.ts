import * as express from 'express';
import { Router } from 'express-serve-static-core';

class App {
  express: express.Express;

  constructor() {
    this.express = express();
    this.registerRoutes();
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
  registerRoutes() {
    const router = express.Router()

    this.registerQuestion(router);
    this.registerReport(router);
    this.registerSectionDetails(router);
    this.registerSections(router);
    this.registerEmpty(router);

    this.express.use('/', router);
  }

  registerEmpty(router: Router) {
    router.get('/', (req, res) => {
      res.json({
        message: 'Rostyslav!'
      });
    });
  }

  registerSections(router: Router) {
    router.get('/sections', (req, res) => {
      // TODO
      res.json([{sectionId: 1}]);
    });
  }

  registerSectionDetails(router: Router) {
    router.get('/section/:sectionId', (req, res) => {
      // TODO
      res.json({sectionId: req.params['sectionId']});
    });
  }

  registerReport(router: Router) {
    router.get('/section/:sectionId/report', (req, res) => {
      // TODO
      res.json([{sectionId: req.params['sectionId'], report: {}}]);
    });
  }

  registerQuestion(router: Router) {
    router.get('/section/:sectionId/question/:questionId', (req, res) => {
      // TODO
      res.json({sectionId: req.params['sectionId'], questionId: req.params['questionId']});
    });
  }
}

export default new App().express;
