import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/songs.entity';
import { User } from 'src/users/users.entity';

@Module({
imports: [TypeOrmModule.forFeature([Playlist,Song,User])],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
