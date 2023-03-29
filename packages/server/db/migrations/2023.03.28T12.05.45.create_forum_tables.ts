import { DataTypes } from "sequelize";

import type { Migration } from "../migrator";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.transaction(t => {
    return Promise.all([
      // sequelize.getQueryInterface().createTable('users', {
      //   id: {
      //     type: DataTypes.INTEGER.UNSIGNED,
      //     autoIncrement: true,
      //     allowNull: false,
      //     primaryKey: true,
      //   },
      //   login: {
      //     type: DataTypes.STRING,
      //     allowNull: false,
      //   },
      //   display_name: {
      //     type: DataTypes.STRING,
      //     allowNull: true,
      //   },
      //   avatar: {
      //     type: DataTypes.TEXT,
      //     allowNull: true,
      //   }
      // }, { transaction: t }),
      sequelize.getQueryInterface().createTable(
        "topics",
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          title: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          author_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            // references: {
            //   model: 'users',
            //   key: 'id',
            // }
          },
          creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
          },
        },
        { transaction: t }
      ),
      sequelize.getQueryInterface().createTable(
        "comments",
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          comment: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          topic_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
              model: "topics",
              key: "id",
            },
          },
          author_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            // references: {
            //   model: 'users',
            //   key: 'id',
            // }
          },
          parent_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
              model: "comments",
              key: "id",
            },
          },
          creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
          },
        },
        { transaction: t }
      ),
      sequelize.getQueryInterface().createTable(
        "likes",
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
          },
          comment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
              model: "comments",
              key: "id",
            },
          },
          user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            // references: {
            //   model: 'users',
            //   key: 'id',
            // }
          },
          status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
        },
        { transaction: t }
      ),
    ]);
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.transaction(t => {
    return Promise.all([
      sequelize.getQueryInterface().dropTable("likes", { transaction: t }),
      sequelize.getQueryInterface().dropTable("comments", { transaction: t }),
      sequelize.getQueryInterface().dropTable("topics", { transaction: t }),
      // sequelize.getQueryInterface().dropTable("users",{ transaction: t }),
    ]);
  });
};
