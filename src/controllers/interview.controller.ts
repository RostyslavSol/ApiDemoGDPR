import { KnowledgeBaseService } from "../services/knowledge.base.service";
import { Router, Request, Response } from "express";
import { IQuestion } from "../models/interview/question.model";

export class InterviewController {
  private _service: KnowledgeBaseService;
  private _router: Router;

  constructor() {
    this._service = new KnowledgeBaseService();
    const router = this._router = Router();

    this.registerGetQuestion(router);
  }

  public registerGetQuestion(router: Router): void {
    router.get('/section/:sectionId/question/:questionId', async (req: Request, res: Response) => {
      try {
        const sectionId  = Number(req.params['sectionId']);
        const questionId = Number(req.params['questionId']);

        const question: IQuestion = await this._service.getQuestion(sectionId, questionId);

        res.send(question);
      } catch (err) {
        console.error('[InterviewController] registerGetQuestion()', err);
      }
    });
  }

  public getRouter(): Router {
    return this._router;
  }
}