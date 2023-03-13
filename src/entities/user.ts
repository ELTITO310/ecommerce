import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsEmail } from 'class-validator'

export class ShopCart {
    @Column()
    id: string

    constructor(id: string) {
        this.id = id
    }

}

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    name: string

    @Column()
    lastname: string

    @IsEmail()
    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string
    
    @Column({
        default: false
    })
    admin: boolean

    @Column((type) => ShopCart)
    shopcart: ShopCart[]


}