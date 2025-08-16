import { getPreferenceValues } from "@raycast/api";

export async function fetchWorkspaces(archived: boolean | undefined, sessionToken: string): Promise<any> {
  const preferences = getPreferenceValues<Preferences>();

  const response = await fetch(
    `${preferences["instance-url"]}/api/v1/workspaces?offset=0&limit=10${archived == "hi" ? `&archived=${"false"}` : ""}`,
    {
      method: "GET",
      headers: {
        Authorization: sessionToken,
        "Content-Type": "application/json",
      },
    },
  )
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e.message);
    });

  return { items: response.items, count: response.count };
}
