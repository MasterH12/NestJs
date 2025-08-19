import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from "typeorm";

import { Profile } from './profile.entity';

@Entity({
    name:'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
         type: 'varchar',
         length: 255,
         unique: true 
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'udpated_at'
    })
    updatedAt: Date;

    @OneToOne( () => Profile, {nullable: false, cascade: true})
    @JoinColumn({name: 'profile_id'})
    profile: Profile;
}