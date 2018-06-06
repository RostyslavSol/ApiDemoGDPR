export interface ISummaryItem {
  isSuccess:  boolean;
  text:       string;
}

export interface IReport {
  sectionId: number;
  sectionName: string;
  summary: ISummaryItem[];
}
