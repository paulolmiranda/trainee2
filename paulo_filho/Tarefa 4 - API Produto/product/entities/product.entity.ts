import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { nanoid } = require('nanoid');

@Entity('Products')
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
     name: string;
    
     @Column()
     color: string;
    
     @Column()
     mark: string;

     @BeforeInsert()
     generateId() {
        this.id = `${nanoid()}`;
    }
     
}