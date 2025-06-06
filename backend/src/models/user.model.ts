import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

// Define attributes for type safety
export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  phone_number?: string;
  password_hash: string;
  role_id: number;
  is_active?: boolean;
  is_locked?: boolean;
  last_login?: Date;
  login_attempts?: number;
  last_password_change?: Date;
  two_factor_enabled?: boolean;
  language_preference?: string;
  timezone?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Optional fields for creation (e.g. auto-generated or defaulted)
type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'phone_number'
  | 'is_active'
  | 'is_locked'
  | 'last_login'
  | 'login_attempts'
  | 'last_password_change'
  | 'two_factor_enabled'
  | 'language_preference'
  | 'timezone'
  | 'created_by'
  | 'updated_by'
  | 'created_at'
  | 'updated_at'
>;

// Sequelize model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public phone_number?: string;
  public password_hash!: string;
  public role_id!: number;
  public is_active!: boolean;
  public is_locked!: boolean;
  public last_login?: Date;
  public login_attempts!: number;
  public last_password_change?: Date;
  public two_factor_enabled!: boolean;
  public language_preference!: string;
  public timezone!: string;
  public created_by?: string;
  public updated_by?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Init model
export const initUserModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      login_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      last_password_change: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      two_factor_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      language_preference: {
        type: DataTypes.STRING,
        defaultValue: 'en',
      },
      timezone: {
        type: DataTypes.STRING,
        defaultValue: 'UTC',
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return User;
};

export default User;
