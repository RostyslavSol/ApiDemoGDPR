import { IReport } from "../models/report/report.model";
import { ISection } from "../models/dashboard/section.model";
import { ISectionDetails } from "../models/section.details/section.details.model";
import { IQuestion } from "../models/interview/question.model";

export class KnowledgeRepository {
  sections: ISection[] = [
    {
      sectionId: 1,
      title: 'Lawfulness',
      text: 'Assess lawfulness of personal data processing. With questions from Art. 6 GDPR',
      redirectUrl: 'details',
      svgUrl: '../../../assets/images/svg/lawfulness.svg'
    }, {
      sectionId: 2,
      title: 'Registry',
      text: 'Check if your organization requires implementation of the Registry for processing activities',
      redirectUrl: 'details',
      svgUrl: '../../../assets/images/svg/registry.svg'
    }, {
      sectionId: 3,
      title: 'Data Protection Officer',
      text: 'Check if your organization requires assignment of Data Protection Officer',
      redirectUrl: 'details',
      svgUrl: '../../../assets/images/svg/dpo.svg'
    }, {
      sectionId: 4,
      title: 'Individual Rights',
      text: 'Assess your ability to provide individual rights of data subjects',
      redirectUrl: 'details',
      svgUrl: '../../../assets/images/svg/individual.rights.svg'
    }, {
      sectionId: 5,
      title: 'Data Breach Notification',
      text: 'Assess your data breach notification mechnism to conform the Regulation',
      redirectUrl: 'details',
      svgUrl: '../../../assets/images/svg/data.breach.notification.svg'
    }, {
      sectionId: 6,
      title: 'Data Export outside EU',
      text: 'Assess the lawfulness of exporting personal data outside European Union',
      redirectUrl: 'details',
      svgUrl: '../../../assets/images/svg/data.export.svg'
    }
  ];

  sectionDetails: ISectionDetails = {
    sectionId: 1,
    announcement: {
      title: 'Lawfulness of Personal Data  Processing',
      info: 'Assess lawfulness of personal data processing according to articles of General Data Protection Regulation:',
      list: [
        'Article 6 EU GDPR "Lawfulness of processing"',
        'Article 7 EU GDPR "Conditions for consent"',
        'Article 8 EU GDPR "Conditions applicable to child\'s consent in relation to information society services"'
      ]
    },
    overviews: [
      {
        title: 'WHAT WILL BE ASKED',
        text: 'You will be asked questions related to the professional activity of your organization. There is an option to let the system know if you don’t know the answer on the question. References and additional help to answer the questions will be provided.'
      },
      {
        title: 'WOULD THIS INFORMATION BE EXPOSED',
        text: 'The interview is fully anonymous and the answers are not stored in the system unless you are the authenticated user and directly command the system to save your interview.'
      }
    ],
    questionnaire: []
  };

  question: IQuestion = {
    questionId: 1,
    title: `Consent must be unambiguous. This means customers need to easily understand what they
    are signing up for. Is there any doubt in your statements?`,
    invalidExample: {
      title: 'Examples of invalid consent:',
      list: ['Click to accept', 'I agree']
    },
    validExample: {
      title: 'Examples of valid consent:',
      list: [
        'I would like to receive emails from [Brand name]',
        'Sign me up for email communications',
        'I understand and agree to the email marketing terms & conditions'
      ]
    },
    info: 'For information, please, visit the references from reference section',
    answers: [
      {
        code: '1',
        text: 'Statements on the consent form of my organization are clear, precise and similar to ones from the valid example'
      },
      {
        code: '2',
        text: 'Statements on the consent form of my organization are more similar to the ones on the invalid example'
      },
      {
        code: '3',
        text: 'I am not sure about the answer'
      }
    ],
    references: [
      {
        title: 'Article 6 EU GDPR "Lawfulness of processing"',
        link: 'https://gdpr-info.eu/art-6-gdpr/'
      },
      {
        title: 'Article 7 EU GDPR "Conditions for consent"',
        link: 'https://gdpr-info.eu/art-7-gdpr/'
      }
    ]
  };

  constructor() { }
}
