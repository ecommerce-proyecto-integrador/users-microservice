import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { Users } from './dtos/entity/user.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';

import { JwtService } from '@nestjs/jwt';
import { Recovery } from './dtos/entity/recovery.dtos';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy,
  @InjectRepository(Users) private readonly userRepository: Repository<Users>,private readonly jwtService: JwtService,
  
  @InjectRepository(Recovery) private readonly recoveryRepository: Repository<Recovery>,
  ){}
  
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

  async showInfoUser(correo: string): Promise<{ nombre: string; correo: string; phone: string; rut: string } | null> {
    const usuario = await this.userRepository.findOne({ where: { correo } });

    if (usuario) {
      return {
        nombre: usuario.name,
        correo: usuario.correo,
        phone: usuario.phone,
        rut: usuario.rut,
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
    const payload = { correo: user.correo,rol:user.rol };
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    return accessToken;
  }
  /*
  generate2AccessToken(correo: string): string {
    const expiresIn = 3600;
    const payload = { correo };
    const accessToken = this.jwtService.sign(payload, { expiresIn });
    return accessToken;
  }*/
  generate2AccessToken(user: Partial<Users>): string {
    const expiresIn = 3600;
    const payload = { correo: user.correo,rol:user.rol };
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
  
}
