import { createTheme } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useMemo, useState } from "react";

import {
  useLazyGetUserThemeQuery,
  usePostUserThemeMutation,
} from "@/entities/theme/api";
import { useGetUserQuery } from "@/entities/user/model/api";

import { NOT_FOUND_STATUS, ThemeNames } from "../constants";
import { createThemeOptions } from "../utils/createThemeOptions";

export const useBasicTheme = () => {
  const { data: user } = useGetUserQuery();
  const [getUserTheme] = useLazyGetUserThemeQuery();
  const [postUserTheme] = usePostUserThemeMutation();
  const [mode, setMode] = useState<ThemeNames.LIGHT | ThemeNames.DARK>(
    ThemeNames.DARK
  );
  const options = createThemeOptions(mode);

  const getUserThemeHandler = async (id: number) => {
    const { data, error } = await getUserTheme(id);

    if (data) {
      setMode(data.theme);
    }

    if (error && (error as FetchBaseQueryError).status === NOT_FOUND_STATUS) {
      postUserTheme({
        id,
        theme: mode,
      });
    }
  };

  useEffect(() => {
    if (user && user.id) {
      getUserThemeHandler(user.id);
    }
  }, [user]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode =>
          prevMode === ThemeNames.LIGHT ? ThemeNames.DARK : ThemeNames.LIGHT
        );
        if (user && user.id) {
          postUserTheme({
            id: user.id,
            theme:
              mode === ThemeNames.LIGHT ? ThemeNames.DARK : ThemeNames.LIGHT,
          });
        }
      },
    }),
    [user, mode]
  );

  const theme = useMemo(() => createTheme(options), [mode]);

  return [theme, colorMode] as const;
};
