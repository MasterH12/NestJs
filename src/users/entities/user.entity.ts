import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name:'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column()
    password: string;
}