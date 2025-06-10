import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity()

export class TimeEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    titles: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
     updatedAt: Date;



}
