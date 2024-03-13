import { Column, Entity} from "typeorm"

@Entity()
export class Semaforo{
    @Column({ primary: true, generated: true })
    idSemaforo?: number;

    @Column()
    idContract?: number;
    
    @Column({ nullable: true })
    supervisor_area?: string;

    @Column({ nullable: true })
    administrador_contrato?: string;
    
    @Column({ nullable: true })
    secretario_gerencia?: string;

    @Column({ nullable: true })
    gerente1?: string;

    @Column({ nullable: true })
    gerente2?: string;

    @Column({ nullable: true })
    gerente3?: string;

    
}