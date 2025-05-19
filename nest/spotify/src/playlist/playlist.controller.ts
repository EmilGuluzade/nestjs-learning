import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  
  @Get()
  async getAll(): Promise<Playlist[]> {
    return this.playlistService.getAll();
  }

  @Post()
  async create(@Body() playListDTO: CreatePlayListDto): Promise<Playlist> {
    return this.playlistService.create(playListDTO);
  }
}
