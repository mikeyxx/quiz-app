import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store";

const PrivateRoutes = () => {
  const { token } = useAppSelector((state) => state.users);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
