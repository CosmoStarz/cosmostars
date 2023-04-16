import { Box, List } from "@mui/material";

import { CommentFrameWidth } from "@/shared/constants";

import { GenericListType } from "./types";

export const GenericList = <T, U extends Record<string, unknown>>({
  items,
  width,
  renderItem: RenderComponent,
  ...args
}: GenericListType<T> & U) => {
  const listWidth = width ?? CommentFrameWidth.MAX;

  return (
    <List
      sx={{
        width: `${listWidth}%`,
        ml: "auto",
        overflowY: "auto",
      }}>
      {items.map((item, index) => {
        return (
          <Box key={`comment-${index}`}>
            <RenderComponent {...item} width={listWidth} {...args} />
          </Box>
        );
      })}
    </List>
  );
};
