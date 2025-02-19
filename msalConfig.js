// msalConfig.js
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_B2C_CLIENT_ID,
    // Construct the authority URL using your tenant name.
    authority: `https://${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT_NAME}.onmicrosoft.com/B2C_1_siso`,
    knownAuthorities: [`${process.env.NEXT_PUBLIC_AZURE_B2C_TENANT_NAME}.b2clogin.com`],
    redirectUri: process.env.NEXT_PUBLIC_AZURE_B2C_REDIRECT_URI || "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This can be changed to "localStorage" if needed.
    storeAuthStateInCookie: false, // Set to true for IE11 or lower.
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        console.log(message);
      },
    },
  },
};
