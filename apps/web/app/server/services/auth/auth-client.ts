import { NavigateFunction } from "@remix-run/react";
import { createAuthClient } from "better-auth/react";

/*
 * polar
 */
import { polarClient } from "@polar-sh/better-auth";

/*
 * auth client
 */
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined" && window.ENV
      ? window.ENV.APP_BASE_URL
      : "https://gitsprint.leocode.tech",
  trustedOrigins:
    typeof window !== "undefined" && window.ENV
      ? [window.ENV.APP_BASE_URL, window.ENV.API_BASE_URL]
      : ["https://gitsprint.leocode.tech"],
  plugins: [polarClient()],
});

// start ------------------------------ google signin ------------------------------
export const betterAuthGoogle = async () => {
  const response = await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/feature/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/auth/signin",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/feature/onboarding",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: false,
    /**
     * The scopes to request from the provider
     * @default []
     */
    scopes: ["openid", "email", "profile"],
  });
  console.log("response from google signin", response);
};

// start ------------------------------ github signin ------------------------------
export const betterAuthGithub = async () => {
  const response = await authClient.signIn.social({
    /**
     * The social provider ID
     */
    provider: "github",
    /**
     * A URL to redirect after the user authenticates with the provider
     */
    callbackURL: "/feature/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/auth/signin",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/feature/onboarding",
    /**
     * disable the automatic redirect to the provider.
     */
    disableRedirect: false,
    /**
     * The scopes to request from the provider
     */
    scopes: ["user:email", "read:user", "repo"],
  });
  console.log("response from github signin", response);
};

// start ------------------------------ signout ------------------------------
export const betterAuthSignout = async (navigate: NavigateFunction) => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        console.log("signout success");
        navigate("/");
      },
    },
  });
};
// end ------------------------------ signout ------------------------------
