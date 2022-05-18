import { BadRequestException } from '@nestjs/common';

export const videoFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mp4|mov|avi)$/)) {
    return callback(
      new BadRequestException('Solo formatos de video estan permitidos'),
      false,
    );
  }
  callback(null, true);
};
