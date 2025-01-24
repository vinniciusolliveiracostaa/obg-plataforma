import { Entity, Column } from "typeorm";


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

export enum Category {
    INDIGENOUS = 'INDIGENAS',
    RIVERSIDE_COMMUNITIES = 'COMUNIDADES_RIBEIRINHAS',
    BLACK_POPULATION = 'POPULAÇÃO_NEGRA',
    QUILOMBOLAS = 'QUILOMBOLAS',
    PEOPLE_WITH_DISABILITIES = 'PESSOA_COM_DEFICIENCIA',
    OTHER_TRADITIONAL_COMMUNITIES = 'OUTRAS_COMUNIDADES_TRADICIONAIS'
}


@Entity()
export abstract class Person {
    @Column({ type: 'varchar', length: 14, unique: true }) // Incluindo os pontos e traço
    cpf: string;

    @Column({ type: 'enum', enum: GenreType })
    genre: GenreType;

    @Column({ type: 'enum', enum: ColorOrRace })
    colorOrRace: ColorOrRace;

    @Column({ type: 'enum', enum: Category, array: true })
    categories: Category[];
}