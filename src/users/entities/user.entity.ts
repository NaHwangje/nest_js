import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/posts.service';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsString, Length, max } from 'class-validator';

@Entity()
export class UsersModel extends BaseModel{

  @Column({
    length: 20,
    unique: true
  })
  @IsString()
  @Length(1, 20,{message: '닉네임은 1~20자 사이로 입력해주세요'})
  // 1) 길이가 20을 넘지 않을것
  // 2) 유일무이한 값이 될것
  nickname: string;

  @Column({
    unique: true
  })
  @IsString()
  @IsEmail()
  // 1) 유일무이한 값이 될 것
  email: string;

  @Column()
  @IsString()
  @Length(3,8)
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER 
  })
  role: RolesEnum

  @OneToMany(()=>PostsModel, (post)=>post.author)
  posts: PostModel[];

}
