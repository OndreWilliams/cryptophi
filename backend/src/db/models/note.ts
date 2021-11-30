'use strict';

import {
  Model,
  DataTypes
} from "sequelize";

import dbConn from '../init';

interface NoteAttributes {
  id: number;
  userId: string;
  instrument: string;
  title: string;
  content: string;
}

class Note extends Model<NoteAttributes>
  implements NoteAttributes {

  public id!: number;
  public userId!: string;
  public instrument!: string;
  public title!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updateddAt!: Date;
}

Note.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  instrument: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(128)
  },
  content: {
    type: DataTypes.STRING(4096),
    allowNull: false
  }
}, {
  sequelize: dbConn,
  tableName: 'Notes'
});

export default Note;
