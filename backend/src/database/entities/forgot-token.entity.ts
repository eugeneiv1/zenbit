import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity('forgot-tokens')
export class ForgotTokenEntity extends BaseEntity {
  @Column('text')
  forgotToken: string;

  @Column({ nullable: true })
  user_Id: string;
  @OneToOne(() => UserEntity, (entity) => entity.forgotToken)
  @JoinColumn({ name: 'user_Id' })
  user?: UserEntity;
}
