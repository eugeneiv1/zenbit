import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity('refresh-tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Column('text')
  refreshToken: string;

  @Column({ nullable: true })
  user_Id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_Id' })
  user?: UserEntity;
}
