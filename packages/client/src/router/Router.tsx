import { Route, Routes } from "react-router-dom";
import { ForumPage } from "@/pages/ForumPage";
import { ForumTopicPage } from "@/pages/ForumTopicPage";
import { GamePage } from "@/pages/GamePage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RoutesName } from "@/shared/constants";
import { GuestMode } from "./modes/GuestMode";
import { PrivateMode } from "./modes/PrivateMode";
import { SignUpPage } from "@/pages/sign-up";
import { SignInPage } from "@/pages/sign-in";

export const Router = () => {
  return (
    <Routes>
      <Route
        path={RoutesName.MAIN}
        element={
          <PrivateMode>
            <MainPage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.PROFILE}
        element={
          <PrivateMode>
            <ProfilePage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.LEADERBOARD}
        element={
          <PrivateMode>
            <LeaderboardPage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.FORUM}
        element={
          <PrivateMode>
            <ForumPage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.FORUM_DETAIL}
        element={
          <PrivateMode>
            <ForumTopicPage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.GAME}
        element={
          <PrivateMode>
            <GamePage />
          </PrivateMode>
        }
      />
      <Route
        path={RoutesName.LOGIN}
        element={
          <GuestMode>
            <SignInPage />
          </GuestMode>
        }
      />
      <Route
        path={RoutesName.REGISTRATION}
        element={
          <GuestMode>
            <SignUpPage />
          </GuestMode>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
