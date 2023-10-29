import  { IsString } from "class-validator"

export class LoginUserDto{
    @IsString()
    claveAntigua:string
    @IsString()
    claveNueva:string
}