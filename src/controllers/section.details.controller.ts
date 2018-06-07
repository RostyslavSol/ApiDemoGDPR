import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { ISectionDetails } from "../models/section.details/section.details.model";

export class SectionDetailsController {
  private _service: KnowledgeBaseService;
  private _router: Router;

  constructor() {
    this._service = new KnowledgeBaseService();
    const router = this._router = Router();

    this.registerGetSectionDetails(router);
  }

  public registerGetSectionDetails(router: Router): void {
    router.get('/section/:sectionId', async (req: Request, res: Response) => {
      try {
        const sectionId = Number(req.params['sectionId']);
        const sectionDetails: ISectionDetails = await this._service.getSectionDetails(sectionId);

        res.send(sectionDetails);
      } catch (err) {
        console.error('[SectionDetailsController] registerGetSectionDetails()', err);
      }
    });
  }

  public getRouter(): Router {
    return this._router;
  }
}