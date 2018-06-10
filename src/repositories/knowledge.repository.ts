import { IReport } from "../models/report/report.model";
import { ISection } from "../models/dashboard/section.model";
import { ISectionDetails } from "../models/section.details/section.details.model";
import { IQuestion } from "../models/interview/question.model";

import * as fs from 'fs';

export class KnowledgeRepository {
  sections: ISection[];
  sectionDetails: ISectionDetails;
  questions: IQuestion[];

  constructor() {
    fs.readFile('C:/source/ApiDemoGDPR/src/assets/sections.json', 'utf8', (err, data) => {
      this.sections = JSON.parse(data) as ISection[];
    });

    fs.readFile('C:/source/ApiDemoGDPR/src/assets/section.details.json', 'utf8', (err, data) => {
      this.sectionDetails = JSON.parse(data) as ISectionDetails;
    });

    fs.readFile('C:/source/ApiDemoGDPR/src/assets/questions.json', 'utf8', (err, data) => {
      this.questions = JSON.parse(data) as IQuestion[];
    });
  }
}