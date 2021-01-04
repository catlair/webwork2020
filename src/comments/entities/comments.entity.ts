import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';

//留言表
@Entity({
  name: 'comments',
})
export class CommentsEntity {
  // 自动生成主键
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @CreateDateColumn()
  created_time: Date;

  @Column({
    length: 255,
  })
  @IsNotEmpty()
  content: string;

  @Column({
    type: 'int',
    name: 'is_verify',
    default: 0
  })
  isVerify: 0 | 1;

  //这是一个外键这里一定要定义一下,不然是空的
  @Column({ name: 'user_id' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  // 多张图片只包含一个作品集
  @ManyToOne(type => Users, users => users.comments)
  @JoinColumn({ name: 'user_id' })
  // 自定义关联id字段名
  user: Users;
}
