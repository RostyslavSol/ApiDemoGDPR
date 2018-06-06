import * as express from 'express';

class App {
  express: express.Express;

  constructor() {
    this.express = express();
    this.registerRoutes();
  }

  registerRoutes() {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express;
