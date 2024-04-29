import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DealEntity } from './deal.entity';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity('user-to-deal')
export class UserToDealEntity extends BaseEntity {
  @Column({ nullable: true })
  user_Id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.deals)
  @JoinColumn({ name: 'user_Id' })
  user?: UserEntity;

  @Column({ nullable: true })
  deal_Id: string;
  @ManyToOne(() => DealEntity, (entity) => entity.users)
  @JoinColumn({ name: 'deal_Id' })
  deal?: DealEntity;
}
