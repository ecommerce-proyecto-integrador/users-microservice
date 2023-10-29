import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { Users } from './dtos/entity/user.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';

import { JwtService } from '@nestjs/jwt';
import { Recovery } from './dtos/entity/recovery.dtos';
import * as nodemailer from 'nodemailer';
import { Equipos } from './dtos/entity/equipos.dtos';
import { EquipoIntegranteRol } from './dtos/entity/equipoIntegranteRol.dto';
@Injectable()
export class AppService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy,
  @InjectRepository(Users) private readonly userRepository: Repository<Users>,private readonly jwtService: JwtService,
  @InjectRepository(Equipos) private readonly equipoRepository: Repository<Equipos>,
  @InjectRepository(Recovery) private readonly recoveryRepository: Repository<Recovery>,
  @InjectRepository(EquipoIntegranteRol) private readonly equipoIntegranteRolRepository: Repository<EquipoIntegranteRol>){}
  
  /////////////////////////////////////////////////////// USUARIOS ///////////////////////////////////////////////////////
  async create(createUserDto: CreateUserDto) {
    
    
    const usuarioBuscado = await this.userRepository.findOne({ where: { correo:createUserDto.correo } });
    if(usuarioBuscado){
      return false
    }else{
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user); // Espera a que se complete
      return true; 

    }
    
  }
 
   async updatePassword(correo: string, claveAntigua: string, nuevaClave: string,): Promise<boolean> {
    
    const usuario = await this.userRepository.findOne({ where: { correo } });
    

    if(usuario && usuario.clave == claveAntigua){
      usuario.clave = nuevaClave;
      await this.userRepository.save(usuario);
      
      return true;
    }
    

    return false;
  }

  async showInfoUser(correo: string): Promise<{ nombre: string; correo: string } | null> {
    const usuario = await this.userRepository.findOne({ where: { correo } });

    if (usuario) {
      return {
        nombre: usuario.name,
        correo: usuario.correo,
      };
    }

    return null; 
  }

  async findUserTest(correo: string, clave: string): Promise<Users | null> {
    const user = await this.userRepository.findOne({ where: { correo, clave } });
    return user || null;
  }

  generateAccessToken(user: Partial<Users>): string {
    const expiresIn = 3600;
    const payload = { correo: user.correo, };
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    return accessToken;
  }
  generate2AccessToken(correo: string): string {
    const expiresIn = 3600;
    const payload = { correo };
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    return accessToken;
  }
  
  async recoveryCode(correoT: string): Promise<string> {
   
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "pruebasproyecto460@gmail.com",
        pass: "jpan cdhh swbv bpxh",
      },
    });

    // Crea el objeto del correo
    const mailOptions = {
      from: 'pruebasproyecto460@gmail.com',
      to: correoT,
      subject: 'Código de Recuperación',
      text: `Tu código de recuperación es: ${codigo}`,
    };

    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
      } else {
        console.log('Correo enviado:', info.response);
      }
    });
    const recovery = new Recovery();
    recovery.correo = correoT;
    recovery.codigo = codigo;
    await this.recoveryRepository.save(recovery);
    return codigo;
  }

  async confirmCode(correo:string,code:string): Promise<boolean> {
   
    
    const recovery = await this.recoveryRepository.findOne({ where: { correo } });
    await this.recoveryRepository.remove(recovery)
    if (recovery.codigo == code) {
      
      return true;
    }
    
    return false; 
  }

  async updatePassword2(correo: string,nuevaClave: string): Promise<boolean> {
    
    const usuario = await this.userRepository.findOne({ where: { correo } });
    

    if(usuario){
      usuario.clave = nuevaClave;
      await this.userRepository.save(usuario);
      
      return true;
    }
    

    return false;
  }
  /////////////////////////////////////////////////////// USUARIOS ///////////////////////////////////////////////////////
   

  /////////////////////////////////////////////////////// EQUIPOS ///////////////////////////////////////////////////////
  
  async createEquipos(nombre: string,correo: string): Promise<boolean> {
    const equipo = new Equipos();
    equipo.name = nombre;
    equipo.correoCreador = correo;
    //console.log(equipo)
    const savedEquipo = await this.equipoRepository.save(equipo);
    console.log("asd",savedEquipo) 
    if(savedEquipo){
      return true;
    }
    
    return false; 
  }

  async showInfoEquipo(correoT: string): Promise<{ id: number,nombre: string; correo: string }[] | null> {
    const correoCreador = correoT;
    const equipos = await this.equipoRepository.find({ where: { correoCreador } });
  
    if (equipos && equipos.length > 0) {
      
      return equipos.map((equipo) => ({ id: equipo.idEquipos,nombre: equipo.name, correo: equipo.correoCreador }));
    }
  
    return null; 
  }

  async updateNameEquipo(correo: string,nuevoNombreEquipo: string,antiguoNombreEquipo: string): Promise<boolean> {
    const correoCreador = correo;
    const name = antiguoNombreEquipo;
    const equipo = await this.equipoRepository.findOne({ where: { correoCreador,name } });
    

    if(equipo && equipo.correoCreador == correo && antiguoNombreEquipo == equipo.name){
      equipo.name = nuevoNombreEquipo;
      await this.equipoRepository.save(equipo);
      
      return true;
    }
    

    return false;
  }

  async deleteNameEquipo(correo: string , nameEquipo:string): Promise<boolean> {
    const correoCreador = correo;
    const name = nameEquipo;
    const equipo = await this.equipoRepository.findOne({ where: { correoCreador,name } });
    console.log(equipo)

    if(equipo && equipo.correoCreador == correo){
      await this.equipoRepository.remove(equipo);
      
      return true;
    }
    

    return false;
  }

  async agregarIntegrante(nombreE: string, correoI: string, correoT: string): Promise<boolean> {
    
  
    const nombreEquipo = nombreE;
    const correoIntegrante = correoI;
    const correoCreador = correoT;
  
    // Encuentra el equipo por correoCreador y nombre
    const equipo = await this.equipoRepository.findOne({ where: { correoCreador, name: nombreEquipo } });
    const idEquipo = equipo.idEquipos;
    const existeCorreoIntegrante = await this.userRepository.findOne({ where: {correo:correoI } });
    const existeIntegrante = await this.equipoIntegranteRolRepository.findOne({where:{correoIntegrante,equipo:{idEquipos:idEquipo}}})
    if(!existeIntegrante){
      if (existeCorreoIntegrante && equipo ) {
      
        const equipoIntegranteRol = new EquipoIntegranteRol();
        equipoIntegranteRol.equipo = equipo;
        equipoIntegranteRol.correoIntegrante = correoIntegrante;
        

        
        await this.equipoIntegranteRolRepository.save(equipoIntegranteRol);

        return true;
      }

    }
    
        return false;
      }
    
  
    
  
  /////////////////////////////////////////////////////// EQUIPOS ///////////////////////////////////////////////////////
  
}
