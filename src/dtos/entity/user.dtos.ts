import { Column, Entity} from "typeorm"

@Entity()
export class Users{
    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    name: string;
    @Column()
    clave: string
    @Column()
    correo: string
}