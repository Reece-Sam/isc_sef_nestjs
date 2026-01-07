import { IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto { 
    @IsString()
    @IsNotEmpty()
    trophy: string;

    @IsString()
    club: string;

    @IsEnum(['HIGH', 'MEDIUM', 'LOW'], {
        message: 'Priority must be HIGH, MEDIUM, or LOW',

    })
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}