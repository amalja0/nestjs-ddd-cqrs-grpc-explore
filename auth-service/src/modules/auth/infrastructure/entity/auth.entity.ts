import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AuthEntity {
  @PrimaryColumn({ length: 16 })
  nik: string;

  @Column({ length: 320 })
  email: string;

  @Column({ length: 16 })
  phoneNumber: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean' })
  isAdmin: boolean;

  @Column({ type: 'boolean' })
  isActive: boolean;
}