import { Artist } from 'src/artists/artists.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  title: string;
  // @Column('varchar', { array: true })
  // artists: string[];
  @Column({ type: 'time' })
  duration: Date;
  @Column({ type: 'date' })
  releasedDate: Date;
  @Column({ type: 'text' })
  lyrics: string;

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
}
