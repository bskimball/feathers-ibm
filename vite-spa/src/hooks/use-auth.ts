import { AuthContext, IAuthContext } from "@/components/auth-context";
import { useContext } from "react";

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
