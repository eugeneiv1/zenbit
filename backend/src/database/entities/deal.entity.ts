import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { UserToDealEntity } from './user-to-deal.entity';

@Entity('deals')
export class DealEntity extends BaseEntity {
  @Column('text')
  name: string;

  @Column()
  total_price: number;

  @Column()
  ticket_price: number;

  @Column()
  yield: number;

  @Column()
  total_days: number;

  @Column()
  sold: number;

  @Column()
  image: string;

  @OneToMany(() => UserToDealEntity, (entity) => entity.deal, { cascade: true })
  users?: UserToDealEntity[];
}
