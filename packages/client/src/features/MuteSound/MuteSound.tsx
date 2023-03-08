import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC, useEffect } from "react";

import { store } from "@/app/store";
import { toggleIsMutedSound } from "@/entities/game/model/store/gameSlice";
import { isMutedSoundSelector } from "@/entities/game/model/store/selectors";
import sound from "@/entities/game/ui/Sound/Sound";
import { useAppSelector } from "@/shared/hooks/store";

export const MuteSound: FC = () => {
  const isMutedSound = useAppSelector(isMutedSoundSelector);

  useEffect(() => {
    if (isMutedSound) {
      sound.mute();
    } else {
      sound.unmute();
    }
  }, [isMutedSound]);

  const toggleMute = () => {
    store.dispatch(toggleIsMutedSound());
  };

  return (
    <IconButton onClick={toggleMute}>
      {isMutedSound ? <VolumeOff /> : <VolumeUp />}
    </IconButton>
  );
};
