import { Injectable } from '@nestjs/common';
import { Song } from './songs.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';

@Injectable()
export class SongsService {

constructor(@InjectRepository(Song) private songRepository:Repository<Song>){}


    getAll(): Promise<Song[]> {
        return  this.songRepository.find();
    }
    
  
    create(songDTO:CreateSongDto):Promise<Song>{ 
         
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;

        return this.songRepository.save(song);

    }
    getOne(id:number):Promise<Song|null>{ 
        
        return this.songRepository.findOneBy({id});
        
    }
    update(id:number,songDTO:UpdateSongDto): Promise<UpdateResult>{ 
        return this.songRepository.update(id,songDTO);
    }
    delete(id: number ): Promise<DeleteResult>{ 
        return this.songRepository.delete({id});
    }



}
