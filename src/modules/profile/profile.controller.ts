/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import {ProfileService} from './profile.service';
import { UserDto } from '../users/dto/user.dto';



@Controller('profiles')
export class ProfileController {
    constructor(private profileService: ProfileService){}

    @Get()
    async findAll(){
        return await this.profileService.profile();
    }


}