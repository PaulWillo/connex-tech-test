import { sequelize } from '../../service/sequelize';
import { DataTypes } from 'sequelize';

export const Reports = sequelize.define(
  'Reports',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    agent_id: {
      type: DataTypes.INTEGER,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    length_seconds: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    agent_name: {
      type: DataTypes.STRING,
    },
    customer_name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
