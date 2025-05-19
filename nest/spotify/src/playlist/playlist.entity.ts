import { Song } from 'src/songs/songs.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => Song, (song) => song.playList)
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
