import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <h2>Админ Панель</h2>;
};

export default AdminPanel;
