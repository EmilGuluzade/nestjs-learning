import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './songs.entity';
import { UpdateSongDto } from './dto/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService, @Inject("CONNECTION") private connection:Connection) {}

  @Get()
  getAll() :Promise<Song[]> {
    try {
      return this.songsService.getAll();
      // return this.connection.CONNECTION_STRING;
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ):Promise<Song|null> {
    return this.songsService.getOne(id);
  }

  @Post()
  create(@Body() createSong: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSong);
  }

  @Put(':id')
  update(@Param("id",ParseIntPipe) id:number, @Body() updateSong:UpdateSongDto): Promise<UpdateResult> {
    return this.songsService.update(id,updateSong);
  }

  @Delete(':id')
  delete(@Param("id",ParseIntPipe) id:number): Promise<DeleteResult> {
    return this.songsService.delete(id);
  }
}
