/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from '../users/user.entity';


@Injectable()
export class ProfileService {
    constructor(
        private readonly userService: UsersService
    ) { }

    async profile(): Promise<User[]> {
        const user = await this.userService.findAll();
        return user
    }
    
  
}