/* eslint-disable prettier/prettier */
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ProfileService } from "./profile.service";


@Injectable()
    export class LocalStrategy extends PassportStrategy(Strategy){
        constructor(private readonly profileService: ProfileService){
            super();
        }

        async profiles(): Promise<any>{
            const user = await this.profileService.profile();
            return user
        }
    }