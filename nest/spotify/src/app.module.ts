import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevServiceConfig } from './common/providers/DevServiceConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users/users.controller';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';


const devConfig={port:3000}
const proConfig={port:3000}

@Module({
  imports: [SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',  // type of our database
      host: 'localhost', // database host   
      port: 5432,        // database host port
      username:"postgres", // username
      password:"tritan31", // password    
      database:"spotify", // name of our database
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // our entities
      synchronize: true, // synchronize database
      logging:true    
    }),
    ArtistsModule,
    UsersModule



  ],
  controllers: [AppController, UsersController, ArtistsController],
  providers: [
    AppService
    ,

{
  provide: DevServiceConfig,
  useClass: DevServiceConfig, 
},
 {  provide: 'CONFIG',
  useFactory:() =>{
 return (process.env.NODE_ENV === 'development') ? devConfig : proConfig;
  }
} ]



})




export class AppModule implements NestModule {

  constructor(private datasouce:DataSource) {

console.log("DB" ,datasouce.driver.database)

  }


  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }


}
