import { IsString } from 'class-validator';
import { PostsModel } from '../entities/posts.entity';
import { PickType } from '@nestjs/mapped-types';

// Pick, Omitm, Partial -> Type 반환
// PickType, OmitmType, PartialType -> 값을 반환
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {}
