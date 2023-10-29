import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EquipoIntegranteRol } from "./equipoIntegranteRol.dto";

@Entity()
export class Equipos {
  
  @PrimaryGeneratedColumn()
  idEquipos: number;
  
  @Column()
  name: string;
  
  @Column({ nullable: true })
  proyecto: string;

  @Column()
  correoCreador: string;

  @OneToMany(() => EquipoIntegranteRol, equipoIntegrante => equipoIntegrante.equipo)
  equipoIntegrantes?: EquipoIntegranteRol[];
}