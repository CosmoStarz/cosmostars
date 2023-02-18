import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { ProfileWidget } from "@/widgets/Profile/Profile";
import { RoutesName } from "@/shared/constants";

export const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(location?.state?.from ?? RoutesName.PROFILE);
  };
  return (
    <MainLayout>
      <ProfileWidget handleProfile={handleProfile} />
    </MainLayout>
  );
};
