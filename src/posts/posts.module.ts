import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsModel } from './entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModel } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      PostsModel,
      UsersModel,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, AuthService, JwtService, UsersService],
})
export class PostsModule {}
