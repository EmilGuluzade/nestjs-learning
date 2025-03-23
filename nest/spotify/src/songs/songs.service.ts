import { Injectable } from '@nestjs/common';
import { Song } from './songs.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artists.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,

  ) {}

  getAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

 async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;
    song.lyrics = songDTO.lyrics;


const artists= await this.artistRepository.findByIds(songDTO.artists);

song.artists=artists;
    return this.songRepository.save(song);
  }
  getOne(id: number): Promise<Song | null> {
    return this.songRepository.findOneBy({ id });
  }
  update(id: number, songDTO: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, songDTO);
  }
  delete(id: number): Promise<DeleteResult> {
    return this.songRepository.delete({ id });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');
    queryBuilder.orderBy('song.id', 'DESC'); // Or whatever you need to do
    return paginate<Song>(queryBuilder, options);
  }
}
