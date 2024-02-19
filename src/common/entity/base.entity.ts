import { PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseModel{
    @PrimaryGeneratedColumn()
    id: number

    @UpdateDateColumn()
    updatedAt: Date

    @UpdateDateColumn()
    createdAt:Date
}