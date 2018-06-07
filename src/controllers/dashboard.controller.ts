import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { ISection } from "../models/dashboard/section.model";

export class DashboardController {
  private _service: KnowledgeBaseService;
  private _router: Router;

  constructor() {
    this._service = new KnowledgeBaseService();
    const router = this._router = Router();

    this.registerGetSections(router);
  }

  public registerGetSections(router: Router): void {
    router.get('/sections', async (req: Request, res: Response) => {
      try {
        const sections: ISection[] = await this._service.getSections();

        res.send(sections);
      } catch (err) {
        console.error('[DashboardController] registerGetSections()', err);
      }
    });
  }

  public getRouter(): Router {
    return this._router;
  }
}
