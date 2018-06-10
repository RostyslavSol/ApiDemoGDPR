import { IReport } from "../models/report/report.model";

import * as fs from 'fs';

export class ReportGenerator {
  report: IReport;

  constructor() {
    fs.readFile('C:/source/ApiDemoGDPR/src/assets/report.json', 'utf8', (err, data) => {
      this.report = JSON.parse(data) as IReport;
    });
  }
}
