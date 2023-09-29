import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  console.log(user);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
