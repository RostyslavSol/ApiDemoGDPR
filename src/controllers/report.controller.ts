import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { IReport } from "../models/report/report.model";

export class ReportController {
  private _service: KnowledgeBaseService;

  constructor(router: Router) {
    this._service = KnowledgeBaseService.getInstance();

    this.registerGetReport(router);
  }

  public registerGetReport(router: Router): void {
    router.get('/sections/:sectionId/report', async (req: Request, res: Response) => {
      try {
        const sectionId = Number(req.params['sectionId']);
        const report: IReport = await this._service.getReport(sectionId);

        res.send(report);
      } catch (err) {
        console.error('[ReportController] registerGetReport()', err);
      }
    });
  }
}
