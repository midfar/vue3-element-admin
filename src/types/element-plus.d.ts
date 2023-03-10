import type { FormValidateCallback, FormValidationResult } from 'element-plus';

interface IForm {
  validate: (callback?: FormValidateCallback | undefined) => FormValidationResult;
}
