import { Column, Entity} from "typeorm"

@Entity()
export class Recovery{
    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    correo: string;
    @Column()
    codigo: string
    
}