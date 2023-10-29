import  { IsString } from "class-validator"

export class LoginUserDto{
    @IsString()
    nombre:string
    @IsString()
    correo:string
}