import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommentsEntity } from '../../comments/entities/comments.entity';

//用户表
@Entity()
export class Users {
  // 自动生成主键
  @PrimaryGeneratedColumn()
  user_id: number;

  @PrimaryColumn()
  @Column({
    length: 18,
  })
  @IsNotEmpty()
  username: string;

  @Exclude() //过滤掉密码
  @Column({
    length: 18,
  })
  @IsNotEmpty()
  password: string;

  @Column({
    length: 50,
  })
  @IsNotEmpty()
  address: string;

  @Column({
    length: 10,
  })
  @IsNotEmpty()
  birthday: string;

  @Column({
    length: 50,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @OneToMany(type => CommentsEntity, commentsEntity => commentsEntity.user_id)
  comments: CommentsEntity[];
}
