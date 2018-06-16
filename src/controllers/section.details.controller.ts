import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { ISectionDetails } from "../models/section.details/section.details.model";
import { IAnswersPayload } from "../models/interview/answers.payload";

export class SectionDetailsController {
  private _service: KnowledgeBaseService;
  private _

  constructor(router: Router) {
    this._service = KnowledgeBaseService.getInstance();

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

    router.post('/sections/:sectionId', async (req: Request, res: Response) => {
      try {
        const sectionId = Number(req.params['sectionId']);
        const payload = req.body as IAnswersPayload;

        this._service.reportGenerator.setAnswers(payload);

        res.json({ ok: true });
      } catch (err) {
        console.error('[SectionDetailsController] registerGetSectionDetails()', err);
      }
    });
  }
}