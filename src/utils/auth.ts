// @ts-nocheck
import { getPreferenceValues, LocalStorage } from "@raycast/api";

export async function handleAuthStuff() {
  const preferences = getPreferenceValues<Preferences>();

  let session = await LocalStorage.getItem<string>("session-token");

  if (preferences["session-token"] && preferences["session-token"] != "") {
    session = preferences["session-token"];
  }
  let sessionInfo = {
    id: false,
  };

  if (session && session != "") {
    sessionInfo = await fetch(`${preferences["instance-url"]}/api/v1/session`, {
      headers: {
        Authorization: session,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  if (
    !sessionInfo.id ||
    (sessionInfo.user.email != preferences["email"] && !sessionInfo.user.githubId && !sessionInfo.user.googleId)
  ) {
    await LocalStorage.setItem("session-token", "");

    let newSessionInfo = { success: false };
    if (!preferences["session-token"]) {
      newSessionInfo = await fetch(`${preferences["instance-url"]}/api/v1/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: preferences["email"],
          password: preferences["password"],
        }),
      }).then((res) => res.json());
    }

    if (!newSessionInfo.success) {
      await LocalStorage.setItem("session-token", "");
      throw new Error("Failed to authenticate with the provided credentials.");
    }

    await LocalStorage.setItem("session-token", newSessionInfo.token);
    return { sessionToken: newSessionInfo.token, defaultWorkspace: newSessionInfo.user.workspace };
  }

  return { sessionToken: session, defaultWorkspace: sessionInfo.user.workspace };
}
