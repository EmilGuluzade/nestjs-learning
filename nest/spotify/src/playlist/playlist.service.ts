import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Song } from 'src/songs/songs.entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  getAll(): Promise<Playlist[]> {
    return this.playlistRepository.find({
      relations: ['songs', 'user'],
      select: {
        id: true,
        name: true, // Əgər adını da qaytarmalısansa
      },
      loadRelationIds: true, // Bu, əlaqəli cədvəllərin yalnız ID-lərini qaytarır
    });
  }

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    const songs = await this.songRepository.findByIds(playListDTO.songs);
    playList.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playListDTO.user });

    if (user) {
      playList.user = user;
    } else {
      throw new Error('User not found');
    }

    return this.playlistRepository.save(playList);
  }
}
