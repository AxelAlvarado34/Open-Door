import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { toDefaultValue } from 'sequelize/types/utils';
import User from './User.model';

@Table({
    tableName: 'properties',
    timestamps: true
})
class Property extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    id: number

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    title: string

    @Column({
        type: DataType.STRING(500),
        allowNull: false
    })
    description: string

    @Column({
        type: DataType.ENUM('Houses', 'Apartment', 'Warehouse', 'Lots', 'Cabins'),
        allowNull: false,
    })
    category: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price!: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    bedroom: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    parking: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    bathroom: number

    @Column({
        type: DataType.STRING(500),
        allowNull: false
    })
    location: string

    //Realtion User model
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}

export default Property;