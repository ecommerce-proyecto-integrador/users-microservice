import  { IsString } from "class-validator"

export class CreateUserDto{
    @IsString()
    name:string
    @IsString()
    clave:string
    @IsString()
    correo:string
}