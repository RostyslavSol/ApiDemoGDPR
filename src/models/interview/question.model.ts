import { IExample } from "./example.model";
import { IAnswer } from "./answer.model";
import { IReference } from "./reference.model";

export interface IQuestion {
  questionId:     number;
  title:          string;
  invalidExample: IExample;
  validExample:   IExample;
  info:           string;
  answers:        IAnswer[];
  references:     IReference[];
}
