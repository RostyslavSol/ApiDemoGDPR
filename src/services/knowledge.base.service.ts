import { KnowledgeRepository } from '../repositories/knowledge.repository';
import { ReportGenerator } from '../repositories/report.generator';

import { IQuestion } from '../models/interview/question.model';
import { ISection } from '../models/dashboard/section.model';
import { ISectionDetails } from '../models/section.details/section.details.model';
import { IReport } from '../models/report/report.model';

export class KnowledgeBaseService {
  knowledgeRepository: KnowledgeRepository;
  reportGenerator: ReportGenerator;

  constructor() {
    this.knowledgeRepository = new KnowledgeRepository();
    this.reportGenerator     = new ReportGenerator();
  }

  public async getSections(): Promise<ISection[]> {
    return await new Promise<ISection[]>(() => this.knowledgeRepository.sections);
  }

  public async getSectionDetails(sectionId: number): Promise<ISectionDetails> {
    return await new Promise<ISectionDetails>(() => this.knowledgeRepository.sectionDetails)
  }

  public async getQuestion(sectionId: number, questionId: number): Promise<IQuestion> {
    return await new Promise<IQuestion>(() => this.knowledgeRepository.question);
  }

  public async getReport(sectionId: number): Promise<IReport> {
    return await new Promise<IReport>(() => this.reportGenerator.report);
  }
}