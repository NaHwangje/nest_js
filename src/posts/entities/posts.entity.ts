import { Inject, Injectable } from '@nestjs/common';
import { UsersModel } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 1) UsersModel과 연동한다. 외래키로
  // 2) nullable
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
