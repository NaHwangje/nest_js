import { Inject, Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostsModel extends BaseModel{
  // 1) UsersModel과 연동한다. 외래키로
  // 2) nullable
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;


  @Column()
  @IsString({
    message: 'title은 string 타입을 입력해줘야합니다.',
  })
  title: string;

  @Column()
  @IsString({
    message: 'content는 string 타입을 입력해줘야합니다.',
  })
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
