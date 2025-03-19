import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  title: string;
  @Column('varchar', { array: true })
  artists: string[];
  @Column({ type: 'time' })
  duration: Date;
  @Column({ type: 'date' })
  releasedDate: Date;
  @Column({ type: 'text' })
  lyrics: string;  
}
