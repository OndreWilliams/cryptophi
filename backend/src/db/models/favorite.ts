'use strict';

import {
  Model,
  Optional,
  DataTypes
} from 'sequelize';

import dbConn from '../init';

interface FavoriteAttributes {
  id: number;
  userId: number;
  pairId: string;
  base_currency: string;
  quote_currency: string;
  base_min_size: string;
  base_max_size: string;
  base_increment: string;
  display_name: string;
  margin_enabled: boolean;
  fx_stablecoin: boolean;
  trading_disabled: boolean;
  status: string;
}

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, "id"> {}

class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes>
  implements FavoriteAttributes {

  public id!: number;
  public userId!: number;
  public pairId!: string;
  public base_currency!: string;
  public quote_currency!: string;
  public base_min_size!: string;
  public base_max_size!: string;
  public base_increment!: string;
  public display_name!: string;
  public margin_enabled!: boolean;
  public fx_stablecoin!: boolean;
  public trading_disabled!: boolean;
  public status!: string;

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
  pairId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  base_currency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quote_currency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  base_min_size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  base_max_size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  base_increment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  margin_enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  fx_stablecoin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  trading_disabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: dbConn,
  tableName: 'Favorites',
});

export default Favorite;
