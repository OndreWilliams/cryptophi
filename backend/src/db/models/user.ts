'use strict';

import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";

import Note from './note';
import Favorite from './favorite';

import dbConn from '../init';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  hashedPassword: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  id!: number;
  username!: string;
  email!: string;
  hashedPassword!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getNotes!: HasManyGetAssociationsMixin<Note>;
  public addNote!: HasManyAddAssociationMixin<Note, number>;
  public hasNote!: HasManyHasAssociationMixin<Note, number>;
  public countNotes!: HasManyCountAssociationsMixin;
  public createNote!: HasManyCreateAssociationMixin<Note>;

  public getFavorites!: HasManyGetAssociationsMixin<Favorite>;
  public addFavorite!: HasManyAddAssociationMixin<Favorite, number>;
  public hasFavorite!: HasManyHasAssociationMixin<Favorite, number>;
  public countFavorites!: HasManyCountAssociationsMixin;
  public createFavorite!: HasManyCreateAssociationMixin<Favorite>;

  public readonly notes?: Note[];
  public readonly favorites?: Favorite[];

  public static associations: {
    notes: Association<User, Note>;
    favorites: Association<User, Favorite>;
  }
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: dbConn,
  tableName: 'Users',
});

export default User;
