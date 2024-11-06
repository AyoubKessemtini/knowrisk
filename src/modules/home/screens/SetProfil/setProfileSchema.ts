// validationSchema.ts
import * as yup from 'yup';

export const onboardingValidationSchema = yup.object().shape({
  birthday: yup.string().required('Birthday is required'),
  height: yup
    .number()
    .typeError('Height must be a number')
    .positive('Height must be a positive number')
    .required('Height is required'),
  weight: yup
    .number()
    .typeError('Weight must be a number')
    .positive('Weight must be a positive number')
    .required('Weight is required'),
  gender: yup.string().required('Gender is required'),
  bloodType: yup.string().required('Blood type is required'),
});
