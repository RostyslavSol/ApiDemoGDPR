import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { ISectionDetails } from "../models/section.details/section.details.model";

export class SectionDetailsController {
  private _service: KnowledgeBaseService;

  constructor(router: Router) {
    this._service = new KnowledgeBaseService();

    this.registerGetSectionDetails(router);
  }

  public registerGetSectionDetails(router: Router): void {
    router.get('/sections/:sectionId', async (req: Request, res: Response) => {
      try {
        const sectionId = Number(req.params['sectionId']);
        const sectionDetails: ISectionDetails = await this._service.getSectionDetails(sectionId);

        res.send(sectionDetails);
      } catch (err) {
        console.error('[SectionDetailsController] registerGetSectionDetails()', err);
      }
    });
  }
}