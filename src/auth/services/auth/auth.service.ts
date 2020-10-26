import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/models/users.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async generateJWT(user: UserDocument) {
        return await (this.jwtService.signAsync({ user }));
    }

    async hashPassword(password: string) {
        return await <string>(bcrypt.hash(password, 12));
    }

    async comparePasswords(newPassword: string, passwortHash: string) {
        return await (bcrypt.compare(newPassword, passwortHash));
    }
}
