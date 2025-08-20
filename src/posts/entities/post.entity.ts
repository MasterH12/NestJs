import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable } from "typeorm"

import { User } from "../../users/entities/user.entity";
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

    
    @ManyToMany( () => Category, (category) => category.posts)
    @JoinTable({ 
        name: 'posts_categories',
        joinColumn: { name: 'post_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
    })
    categories: Category[];
    
}
