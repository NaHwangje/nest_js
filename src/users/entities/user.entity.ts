import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/posts.service';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';

@Entity()
export class UsersModel extends BaseModel{

  @Column({
    length: 20,
    unique: true
  })
  // 1) 길이가 20을 넘지 않을것
  // 2) 유일무이한 값이 될것
  nickname: string;

  @Column({
    unique: true
  })
  // 1) 유일무이한 값이 될 것
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER 
  })
  role: RolesEnum

  @OneToMany(()=>PostsModel, (post)=>post.author)
  posts: PostModel[];

}
