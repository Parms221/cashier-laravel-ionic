import { IValidationErrorResponse } from "src/app/types/error";

export function GetErrorMessage(field: string, validations: any, serverResponse: IValidationErrorResponse | null): string{
  if (serverResponse && Object.keys(serverResponse.errors).includes(field)) {
    return serverResponse.errors[field].join(', ');
  }

  if (validations[field]) {
    for (let i = 0; i < validations[field].length; i++) {
      if (validations[field][i].type === 'required') {
        return validations[field][i].message as string;
      }
    }
  }

  return "";
  
}