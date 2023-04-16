import { DataTypes } from "sequelize";

import type { Migration } from "../migrator";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.transaction(t => {
    return Promise.all([
      sequelize.getQueryInterface().addColumn(
        "comments",
        "likes_count",
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        { transaction: t }
      ),
    ]);
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.transaction(t => {
    return Promise.all([
      sequelize
        .getQueryInterface()
        .removeColumn("comments", "likes_count", { transaction: t }),
    ]);
  });
};
