// components/AuthGuard.jsx
import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

export default function AuthGuard({ children }) {
  const { instance, accounts } = useMsal();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function initializeMsal() {
      try {
        await instance.initialize();
        await instance.handleRedirectPromise();
      } catch (error) {
        console.error("This is the error during MSAL initialization:", error);
      }
      setInitialized(true);
    }
    initializeMsal();
  }, [instance]);

  useEffect(() => {
    if (initialized && (!accounts || accounts.length === 0)) {
      instance.loginRedirect();
    }
  }, [initialized, accounts, instance]);

  if (!initialized) return <div>Loading authentication...</div>;

  return children;
}
