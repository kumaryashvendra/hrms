import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model"; // assuming User model is defined with Sequelize

interface OtpAttributes {
  id: string;
  userId: string;
  otp: number;
  expireAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OtpCreationAttributes extends Optional<OtpAttributes, "id" | "createdAt" | "updatedAt"> {}

class Otp extends Model<OtpAttributes, OtpCreationAttributes> implements OtpAttributes {
  public id!: string;
  public userId!: string;
  public otp!: number;
  public expireAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Otp.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "otps",
    timestamps: true,
    underscored: true,
  }
);

// Optional association (if User model uses `hasMany`)
// User.hasMany(Otp, { foreignKey: "userId" });
// Otp.belongsTo(User, { foreignKey: "userId" });

export default Otp;
