import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../models/payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor (
        private configService: ConfigService
    ){
        const jwtSecret = configService.get('JWT_SECRET', { infer:true })
        if (!jwtSecret){
            throw new Error("No JWT secret found");
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        });
    }

    validate( payload: Payload) {
        return payload;
    }
}