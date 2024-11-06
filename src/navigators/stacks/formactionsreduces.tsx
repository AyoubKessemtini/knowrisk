// formReducer.ts

import { AnswersScheme } from 'src/schemes/answers.scheme';
import { FormActionTypes, SAVE_FORM_DATA } from './formactionsonborading';

interface FormState {
  formData: { [key: string]: AnswersScheme };
}

const initialState: FormState = {
  formData: {},
};

const formReducer = (
  state = initialState,
  action: FormActionTypes,
): FormState => {
  switch (action.type) {
    case SAVE_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.questionId]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default formReducer;
