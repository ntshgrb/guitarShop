import request from 'axios';
import { toast } from 'react-toastify';
import { HTTP_CODE } from '../const';
import { ErrorType } from '../types/error';

export const errorHandle = (error: ErrorType): void => {

  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.info(response.statusText);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(response.statusText);
        break;
      default:
        toast.info('Что-то пошло не так. Попробуйте позже');
        break;
    }
  }
};
