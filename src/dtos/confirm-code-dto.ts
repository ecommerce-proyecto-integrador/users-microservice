import  { IsString } from "class-validator"

export class ConfirmCode{
    @IsString()
    correo:string
    @IsString()
    code:string
}