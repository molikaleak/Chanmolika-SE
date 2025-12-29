import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "./nav.config";
import { getActiveNav } from "./nav.service";

export function useNavigationController() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeItem = getActiveNav(location.pathname, navItems);

  const onNavigate = (path) => {
    navigate(path);
  };

  return {
    navItems,
    activeItem,
    onNavigate,
  };
}
