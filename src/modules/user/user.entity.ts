import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  lastUpdated: Date;
}
