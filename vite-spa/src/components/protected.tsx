import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ children }: { children: React.JSX.Element }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  return children;
}

export default Protected;
