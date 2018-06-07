import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { IReport } from "../models/report/report.model";

export class ReportController {
  private _service: KnowledgeBaseService;
  private _router: Router;

  constructor() {
    this._service = new KnowledgeBaseService();
    const router = this._router = Router();

    this.registerGetReport(router);
  }

  public registerGetReport(router: Router): void {
    router.get('/section/:sectionId/report', async (req: Request, res: Response) => {
      try {
        const sectionId = Number(req.params['sectionId']);
        const report: IReport = await this._service.getReport(sectionId);

        res.send(report);
      } catch (err) {
        console.error('[ReportController] registerGetReport()', err);
      }
    });
  }

  public getRouter(): Router {
    return this._router;
  }
}
