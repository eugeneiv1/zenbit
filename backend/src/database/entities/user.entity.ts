import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { ForgotTokenEntity } from './forgot-token.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserToDealEntity } from './user-to-deal.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user, {
    cascade: true,
  })
  refreshTokens?: RefreshTokenEntity[];

  @OneToOne(() => ForgotTokenEntity, (entity) => entity.user, {
    cascade: true,
  })
  forgotToken?: ForgotTokenEntity;

  @OneToMany(() => UserToDealEntity, (entity) => entity.user)
  deals?: UserToDealEntity[];
}
