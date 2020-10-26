import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/services/user/user.service";
import { UserDocument } from "src/user/models/users.schema";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: UserDocument = request.user;

        const result = await this.userService.findOne(user._id);
        const hasRole = () => roles.indexOf(result.role) > -1;
        let hasPermission = false;

        if (hasRole()) {
            hasPermission = true;
        };
        return user && hasPermission;
    }
}