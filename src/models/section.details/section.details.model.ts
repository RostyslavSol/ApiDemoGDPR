import { IAnnouncement } from "./announcement.model";
import { IOverviewItem } from "./overview.model";
import { IQuestion }     from "../interview/question.model";

export interface ISectionDetails {
  sectionId:      number;
  announcement:   IAnnouncement;
  overviews:      IOverviewItem[];
  questionnaire:  IQuestion[];
}
