import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, MinLength, Max, Min, IsDate } from 'class-validator'
import { ObjectId } from 'mongodb'

@Entity()
export class Product {
    @ObjectIdColumn()
    id: ObjectId

    @MinLength(8, {
        message: 'Name is short'
    })
    @Column()
    name: string

    @IsInt()
    @Min(10)
    @Max(1000000)
    @Column()
    price: number

    @Column()
    photo: string

    @Column()
    description: string

    @IsDate()
    @CreateDateColumn()
    createdAt: Date

    @IsDate()
    @UpdateDateColumn()
    updateAt: Date

}
