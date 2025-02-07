import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
  exp?: number;
}

const useAuth = (token: string | null) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  return { userId, role };
};

export default useAuth;
