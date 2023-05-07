import { Model, DataTypes, Sequelize, NOW } from "sequelize";
import { hashPassword } from "../../utils/bcrypt";

export const USER_TABLE = "users";

export const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Customer",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
  },
};

export class User extends Model {
  static associate(models: Model[] | any) {
    this.hasOne(models.Customer, {
      as: "customer",
      foreignKey: "userId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
      hooks: {
        beforeCreate: async (user: any, options: any) => {
          const encryptedPassword = await hashPassword(user.password);
          user.password = encryptedPassword;
        },
      },
      defaultScope: {
        attributes: {
          exclude: ["password", "recoveryToken"],
        },
      },
      scopes: {
        withPassword: {
          attributes: ["id", "email", "password", "role", "createdAt"],
        },
        withRecoveryToken: {
          attributes: ["id", "email", "recoveryToken", "role", "createdAt"],
        },
      },
    };
  }
}
