import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('Products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
     name: string;
    
     @Column()
     color: string;
    
     @Column()
     mark: string; 
}