import { IAnswer } from "./answer.model";

export interface IAnswersPayload {
  sectionId: number;
  answers: IAnswer[];
}
