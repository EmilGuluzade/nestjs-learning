import { Exclude } from "class-transformer";
import { Playlist } from "src/playlist/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text' })
    firstName: string;
    @Column({ type: 'text' })
    lastName: string;
    @Column({unique:true, type: 'text' })
    email: string;
    @Column({ type: 'text' })
    @Exclude()
    password: string;
    @Column({ type: 'boolean', default: false })
    isLogin: boolean;
   
@OneToMany(()=>Playlist,(playlist)=>playlist.user)
playlists:Playlist[]

}   