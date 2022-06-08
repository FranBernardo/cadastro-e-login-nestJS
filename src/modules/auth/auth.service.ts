/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        // find if user exist with this email
        const user = await this.userService.findOneByEmail(username);
        if (!user) {
            return 'Usuário e/ou senha inválidos';
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            throw new UnauthorizedException('Usuário e/ou senha inválidos');
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues']
        console.log(result)
        return result;
    }


    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
        
    }

   

    public async create(user) {
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });
        console.log(newUser)

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

     async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    async update(user: User) {
        const dataArray = await this.userService.findOneById(user.id);
        if(dataArray){
            dataArray.name = user.name
            dataArray.email = user.email

        }
    }
}