import { useLocation, useNavigate } from "react-router-dom";
import { BasicLayout } from "../../shared/layouts/BasicLayout";
import { ProfileWidget } from "../../widgets/Profile/Profile";
import { RoutesName } from "../../shared/constants";

export const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(location?.state?.from ?? RoutesName.PROFILE);
  };
  return (
    <BasicLayout>
      <ProfileWidget handleProfile={handleProfile} />
    </BasicLayout>
  );
};
