import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id : string;
        
    @Column()
    nome : string;
    
    @Column()
    cor: string;
    
    @Column()
    marca: string;
}
