import { IReport } from "../models/report/report.model";

import * as fs from 'fs';
import { IAnswersPayload } from "../models/interview/answers.payload";
import { IAnswer } from "../models/interview/answer.model";
import { LawfulnessOfProcessingHelper } from "./lawfulness.of.processing.helper";

export class ReportGenerator {
  private static _instance: ReportGenerator;

  private _currentSectionAnswers: IAnswersPayload = null;
  private _sectionOneHelper: LawfulnessOfProcessingHelper;

  private _report: IReport;

  private constructor() {
    this._sectionOneHelper = LawfulnessOfProcessingHelper.getInstance();
  }

  public setAnswers(payload: IAnswersPayload) {
    this._currentSectionAnswers = payload;
  }

  // Report generation

  public generateReport(): IReport {
    const { sectionId, answers} = this._currentSectionAnswers;

    switch (sectionId) {
      case 1:
        this._report = this.checkLawfulnessOfProcessing(answers);
        break;

      // TODO: add more sections

      default:
        break;
    }

    return this._report;
  }

  public checkLawfulnessOfProcessing(answers: IAnswer[]): IReport {
    const { isCompliant, summary } = this._sectionOneHelper.getLawfulnessOfProcessing(answers);

    const result: IReport = {
      sectionId: 1,
      sectionName: "Lawfulness of Personal Data Processing",
      summary: summary,
      isCompliant: isCompliant
    };

    return result;
  }

  // TODO: add more sections

  // Singleton implementation

  public static getInstance(): ReportGenerator {
    if (!this._instance) {
      this._instance = new ReportGenerator();
    }

    return this._instance;
  }
}
