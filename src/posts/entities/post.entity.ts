import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Category } from "./category.entity";

@Entity({
    name: 'posts'
})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({type: 'text' })
    content: string

    @Column({ type: 'boolean', default: false })
    published: boolean

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at'
    })
    updatedAt: Date;

    @ManyToOne( () => User, (user) => user.posts, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User

    /*
    @ManyToMany( () => Category, (category) => category.posts, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    categories: Category[];
    */
}
