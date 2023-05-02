import { Model, DataTypes, Sequelize, NOW } from "sequelize";

export const CATEGORIES_TABLE = "categories";

export const CategoriesSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: NOW,
  },
};

export class Category extends Model {
  // models
  static associate(models: Model[] | any) {
    this.hasMany(models.Product, { as: "products", foreignKey: "categoryId" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: "Category",
      timestamps: false,
    };
  }
}
