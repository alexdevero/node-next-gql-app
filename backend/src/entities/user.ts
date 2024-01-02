import { BeforeCreate, Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryKey({ type: 'text' })
  id: string = v4()

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt = new Date()

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property({ type: 'text', unique: true })
  username!: string

  @Property({ type: 'text' })
  password!: string

  @Property({ type: 'text', unique: true })
  email!: string

  @BeforeCreate()
  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12)
  }

  public verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }
}
