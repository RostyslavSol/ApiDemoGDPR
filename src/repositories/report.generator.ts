import { IReport } from "../models/report/report.model";

export class ReportGenerator {
  report: IReport = {
    sectionId: 1,
    sectionName: 'Lawfulness of Personal Data Processing',
    summary: [
      { isSuccess: true,  text: 'Your organization has legal bases for personal data processing: consent' },
      { isSuccess: false, text: 'Your consent form is compliant with GDPR requirements' },
      { isSuccess: true,  text: 'Your cookie policy is not conforming regulation requirements' }
    ]
  };

  constructor() { }
}
