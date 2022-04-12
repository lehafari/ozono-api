import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Solo formatos de imagen estan permitidos'),
      false,
    );
  }
  callback(null, true);
};
