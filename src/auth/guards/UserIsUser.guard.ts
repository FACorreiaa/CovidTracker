import {
    Injectable,
    CanActivate,
    Inject,
    forwardRef,
    ExecutionContext,
} from '@nestjs/common';
import { UserDocument } from 'src/user/models/users.schema';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class UserIsUserGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ) {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: UserDocument = request.user;

        const result = await this.userService.findOne(user._id)
        let hasPermission = false;

        if (result._id === Number(params.id)) {
            hasPermission = true;
        }

        return user && hasPermission;
    }
}
