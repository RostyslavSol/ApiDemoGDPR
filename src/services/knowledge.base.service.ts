import { KnowledgeRepository } from '../repositories/knowledge.repository';
import { ReportGenerator } from '../repositories/report.generator';

import { IQuestion } from '../models/interview/question.model';
import { ISection } from '../models/dashboard/section.model';
import { ISectionDetails } from '../models/section.details/section.details.model';
import { IReport } from '../models/report/report.model';

export class KnowledgeBaseService {
  private static _instance: KnowledgeBaseService;

  knowledgeRepository: KnowledgeRepository;
  reportGenerator: ReportGenerator;

  private constructor() {
    this.knowledgeRepository = KnowledgeRepository.getInstance();
    this.reportGenerator     = ReportGenerator.getInstance();
  }

  public async getSections(): Promise<ISection[]> {
    return await Promise.resolve(this.knowledgeRepository.sections);
  }

  public async getSectionDetails(sectionId: number): Promise<ISectionDetails> {
    return await Promise.resolve(this.knowledgeRepository.sectionDetails);
  }

  public async getQuestion(sectionId: number, questionId: number): Promise<IQuestion> {
    return await Promise.resolve(this.knowledgeRepository.questions.find(x => x.questionId === questionId));
  }

  public async getReport(sectionId: number): Promise<IReport> {
    return await Promise.resolve(this.reportGenerator.generateReport());
  }

  public static getInstance(): KnowledgeBaseService {
    if (!this._instance) {
      this._instance = new KnowledgeBaseService();
    }

    return this._instance;
  }
}
