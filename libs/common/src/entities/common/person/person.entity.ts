import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


export enum GenreType {
    MALE = 'MASCULINO',
    FEMALE = 'FEMININO',
    NON_BINARY = 'NAO_BINARIO',
    PREFER_NOT_TO_SAY = 'PREFIRO_NAO_INFORMAR'
}

export enum ColorOrRace {
    BLACK = 'PRETO',
    WHITE = 'BRANCO',
    MIXED = 'PARDA',
    YELLOW = 'AMARELA',
    INDIGENOUS = 'INDIGENA'
}


@Entity()
export abstract class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 14, unique: true }) // Incluindo os pontos e traço
    cpf: string;

    @Column({ type: 'enum', enum: GenreType })
    genre: GenreType;

    @Column({ type: 'enum', enum: ColorOrRace })
    colorOrRace: ColorOrRace;
}
