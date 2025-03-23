import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { Artist } from 'src/artists/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song,Artist])],
  controllers: [SongsController],
  providers: [
    SongsService,

    {
      provide: 'CONNECTION',
      useValue: connection, 
    }
  ]
})
export class SongsModule {}
