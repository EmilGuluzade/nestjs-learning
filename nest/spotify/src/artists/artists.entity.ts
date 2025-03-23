import { Song } from "src/songs/songs.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("artists")
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;
    // @Column({ type: 'text' })
    // name: string;
    // @Column({ type: 'text' })
    // country: string;
    // @Column({ type: 'text' })
    // genre: string;
    // @Column({ type: 'text' })
    // bio: string;



    @OneToOne(()=>User)
    @JoinColumn()
    user:User

    @ManyToMany(()=>Song,(song)=>song.artists)
    songs:Song[]
} 