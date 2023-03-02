import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
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
    id: ObjectID

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
    
    @Column()
    admin: boolean

    @Column((type) => ShopCart)
    shopcart: ShopCart[]


}