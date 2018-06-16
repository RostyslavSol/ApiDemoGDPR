import { IAnswer } from "../models/interview/answer.model";
import { ISummaryItem } from "../models/report/report.model";

export class LawfulnessOfProcessingHelper {
  private static _instance: LawfulnessOfProcessingHelper;

  private _items = [
    { code: "NOT_G_ILLEGALPROC", isSuccess: true, text: "Organization processes personal data legally" },
    { code: "G_ILLEGALPROC", isSuccess: false, text: "Organization processes personal data illegally! Has no base for processing" },

    { code: "G_OPROCDATA", isSuccess: true,  text: "Your organization performs processing of personal data in order to carry out its business" },
    { code: "NOT_G_OPROCDATA", isSuccess: false,  text: "Your organization does not depend on personal data processing" },

    { code: "G_OCTRL", isSuccess: true, text: "Your organization is a Data Controller" },
    { code: "G_OPROC", isSuccess: true, text: "Your organization is a Data Processor" },
    { code: "G_NONE", isSuccess: false, text: "Your organization is a neither Data Controller nor Data Processor" },

    { code: "C_BASECONSNT", isSuccess: true, text: "The basis for personal data processing for your organization is a Consent" },
    { code: "NOT_C_BASECONSNT", isSuccess: false, text: "Consent is not a legal base for personal data processing for your organization" },

    { code: "C_BASECTRCT", isSuccess: true, text: "The basis for personal data processing for your organization is a Contract" },
    { code: "NOT_C_BASECTRCT", isSuccess: false, text: "Contract is not a legal base for personal data processing for your organization" },

    { code: "C_BASELEGOBLG", isSuccess: true, text: "The basis for personal data processing for your organization is a Legal Obligation" },
    { code: "NOT_C_BASELEGOBLG", isSuccess: false, text: "Legal Obligation is not a legal base for personal data processing for your organization" },

    { code: "C_BASEVITAL", isSuccess: true, text: "The basis for personal data processing for your organization is a Vital Interest" },
    { code: "NOT_C_BASEVITAL", isSuccess: false, text: "Vital interest is not a legal base for personal data processing for your organization" },

    { code: "C_BASEPUBTASK", isSuccess: true, text: "The basis for personal data processing for your organization is a Public Task" },
    { code: "NOT_C_BASEPUBTASK", isSuccess: false, text: "Public Task is not a legal base for personal data processing for your organization" },
  ];

  private constructor() {}

  public static getInstance(): LawfulnessOfProcessingHelper {
    if (!this._instance) {
      this._instance = new LawfulnessOfProcessingHelper();
    }

    return this._instance;
  }

  public getLawfulnessOfProcessing(answers: IAnswer[]): {
    isCompliant: boolean,
    summary: ISummaryItem[]
  } {
    const isCompliant = this._checkLawfulnessOfProcessingCompliance(answers);

    return {
      isCompliant: isCompliant,
      summary: [
        this._checkLawfulnessOfProcessing(isCompliant),
        this._checkDataProcessingDependency(answers),
        this._checkDataProcessingRole(answers),
        this._checkConsent(answers),
        this._checkContract(answers),
        this._checkLegalObligation(answers),
        this._checkVitalInterest(answers),
        this._checkPublicTask(answers)
      ]
    };
  }

  private _checkLawfulnessOfProcessingCompliance(answers: IAnswer[]): boolean {
    const isCompliant =
      this._checkDataProcessingDependency(answers).isSuccess &&
      this._checkDataProcessingRole(answers).isSuccess && (
        this._checkConsent(answers).isSuccess ||
        this._checkContract(answers).isSuccess ||
        this._checkLegalObligation(answers).isSuccess ||
        this._checkVitalInterest(answers).isSuccess ||
        this._checkPublicTask(answers).isSuccess
      );
    return isCompliant;
  }

  private _checkLawfulnessOfProcessing(isCompliant: boolean): ISummaryItem {
    let code: string;

    if (isCompliant) {
      code = "NOT_G_ILLEGALPROC";
    } else {
      code = 'G_ILLEGALPROC'
    }

    return this._items.find(x => x.code === code);
  }

  private _checkDataProcessingDependency(answers: IAnswer[]): ISummaryItem {
    let code: string;

    if (answers.find(x => x.code === 'G_OPROCDATA')) {
      code = 'G_OPROCDATA';
    } else {
      code = 'NOT_G_OPROCDATA';
    }

    return this._items.find(x => x.code === code);
  }

  private _checkDataProcessingRole(answers: IAnswer[]): ISummaryItem {
    if (answers.find(x => x.code === 'G_ILLEGALPROC')) {
      return this._items.find(x => x.code === 'G_NONE');
    }

    let code: string;

    if (answers.find(x => x.code === 'G_OCTRL')) {
      code = "G_OCTRL";
    } else {
      code = "G_OPROC"
    }

    return this._items.find(x => x.code === code)
  }

  private _checkConsent(answers: IAnswer[]): ISummaryItem {
    let code: string;

    if (
      answers.find(x => x.code === 'G_OCTRL') &&
      answers.find(x => x.code === 'C_GIVECONSENT') &&
      answers.find(x => x.code === 'C_VALDCONS')
    ) {
      code = 'C_BASECONSNT';
    } else {
      code = 'NOT_C_BASECONSNT';
    }

    return this._items.find(x => x.code === code);
  }

  private _checkContract(answers: IAnswer[]): ISummaryItem {
    let code: string;

    if (
      answers.find(x => x.code === 'G_OCTRL') && (
        answers.find(x => x.code === 'C_OHASCTRCT') ||
        answers.find(x => x.code === 'C_OOBLIGATIONS') ||
        answers.find(x => x.code === 'C_ASKFIRSTSTEP')
      )
    ) {
      code = 'C_BASECTRCT';
    } else {
      code = 'NOT_C_BASECTRCT';
    }

    return this._items.find(x => x.code === code);
  }

  private _checkLegalObligation(answers: IAnswer[]): ISummaryItem {
    let code: string;

    if (
      answers.find(x => x.code === 'G_OCTRL') && (
        answers.find(x => x.code === 'C_LAWCOMPLY')
      )
    ) {
      code = 'C_BASELEGOBLG';
    } else {
      code = 'NOT_C_BASELEGOBLG';
    }

    return this._items.find(x => x.code === code);
  }

  private _checkVitalInterest(answers: IAnswer[]): ISummaryItem {
    let code: string;

    if (
      answers.find(x => x.code === 'G_OCTRL') && (
        answers.find(x => x.code === 'C_OPROTINTRST')
      )
    ) {
      code = 'C_BASEVITAL';
    } else {
      code = 'NOT_C_BASEVITAL';
    }

    return this._items.find(x => x.code === code);
  }

  private _checkPublicTask(answers: IAnswer[]): ISummaryItem {
    let code: string;

    if (
      answers.find(x => x.code === 'G_OCTRL') && (
        answers.find(x => x.code === 'C_ASSGNTASK')
      )
    ) {
      code = 'C_BASEPUBTASK';
    } else {
      code = 'NOT_C_BASEPUBTASK';
    }

    return this._items.find(x => x.code === code);
  }
}
