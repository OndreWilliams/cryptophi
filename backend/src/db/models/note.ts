'use strict';

import {
  Model,
  DataTypes
} from "sequelize";

import dbConn from '../init';

interface NoteAttributes {
  id?: number;
  userId: number;
  content: string;
}

class Note extends Model<NoteAttributes>
  implements NoteAttributes {

  public id!: number;
  public userId!: number;
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
  content: {
    type: DataTypes.STRING(4096),
    allowNull: false
  }
}, {
  sequelize: dbConn,
  tableName: 'Notes'
});

export default Note;
