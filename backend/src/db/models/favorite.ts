'use strict';

import {
  Model,
  DataTypes
} from 'sequelize';

import dbConn from '../init';

interface FavoriteAttributes {
  id: number;
  userId: number;
  instrument: string;
}

class Favorite extends Model<FavoriteAttributes> implements FavoriteAttributes {

  public id!: number;
  public userId!: number;
  public instrument!: string;

  public readonly createdAt!: Date;
  public readonly updateddAt!: Date;
}

Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  instrument: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: dbConn,
  tableName: 'Favorites',
});

export default Favorite;
