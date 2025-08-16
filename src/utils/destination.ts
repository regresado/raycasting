import { getPreferenceValues } from "@raycast/api";

export async function fetchDestinations(
  searchText: string,
  offset: number,
  workspaceId: number | undefined,
  sessionToken: string,
): Promise<any> {
  const preferences = getPreferenceValues<Preferences>();

  const response = await fetch(
    `${preferences["instance-url"]}/api/v1/destinations?searchString=${searchText}&offset=${offset}&limit=10${workspaceId ? `&workspaceId=${workspaceId}` : ""}`,
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

export async function createDestination(
  title: string,
  type: "note" | "location",
  body: string | undefined,
  url: string | undefined,
  tags: string,
  workspaceId: string,
  sessionToken: string,
): Promise<void> {
  const preferences = getPreferenceValues<Preferences>();
  const response = await fetch(`${preferences["instance-url"]}/api/v1/destinations`, {
    method: "POST",
    headers: {
      Authorization: sessionToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      body,
      type,
      location: url,
      tags:
        tags == undefined || tags == ""
          ? []
          : tags.split(",").map((tag) => {
              return { text: tag.trim(), id: tag.trim() };
            }),
      workspaceId: parseInt(workspaceId, 10),
      attachments: [],
    }),
  }).then((res) => res.json());

  if (!response.success) {
    throw new Error(`${response.statusText}`);
  }
}
