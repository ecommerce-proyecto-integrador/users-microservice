import  { IsString } from "class-validator"

export class CreateEquipoDto{
    @IsString()
    name:string
    @IsString()
    correoCreador:string
}