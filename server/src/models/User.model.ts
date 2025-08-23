import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { generateID } from '../helpers/token';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model{

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  password!: string;

  @Column(DataType.STRING)
  token!: string;

  @Column(DataType.BOOLEAN)
  confirmed?: boolean;

  //Hook for hash password
  @BeforeCreate
  static hashPassword = async(instance: User) => {
    const salt = await bcrypt.genSalt(10);
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  //Hook for generate token
  @BeforeCreate
  static generateToke = async(instance: User)=> {
    instance.token = await generateID();
  }

  //Hook to hash new password
  @BeforeUpdate
  static updatePassword = async(instance: User) => {
      if (instance.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          instance.password = await bcrypt.hash(instance.password, salt);
      }
  }

  //Method validate password user login
  async validatedPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;