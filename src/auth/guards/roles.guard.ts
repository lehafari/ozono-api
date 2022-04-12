import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Roles } from 'src/users/enum/roles.enum';
import { JwtGuard } from './jwt.guard';

export const RoleGuard = (...roles: Roles[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;

      return roles.includes(user.role);
    }
  }

  return mixin(RoleGuardMixin);
};
