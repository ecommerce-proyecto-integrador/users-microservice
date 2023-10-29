import  { IsString } from "class-validator"

export class LoginUserDto{
    @IsString()
    clave:string
    @IsString()
    correo:string
}