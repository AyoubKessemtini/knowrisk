// formActions.ts

import { AnswersScheme } from 'src/schemes/answers.scheme';

export const SAVE_FORM_DATA = 'SAVE_FORM_DATA';

interface SaveFormDataAction {
  type: typeof SAVE_FORM_DATA;
  payload: { questionId: string; data: AnswersScheme };
}

export type FormActionTypes = SaveFormDataAction;

export const saveFormData = (
  questionId: string,
  data: AnswersScheme,
): SaveFormDataAction => ({
  type: SAVE_FORM_DATA,
  payload: { questionId, data },
});
