import { createParamDecorator } from '@nestjs/common';

export const Userparam = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
});
