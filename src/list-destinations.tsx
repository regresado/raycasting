import { useEffect, useState } from "react";
import { Icon, Action, ActionPanel, List, useNavigation } from "@raycast/api";
import { usePromise } from "@raycast/utils";

import { fetchDestinations } from "./utils/destination";
import { handleAuthStuff, setDefaultWorkspace } from "./utils/auth";
import CreateDestination from "./create-destination";

export default function ListDestinations() {
  const [searchText, setSearchText] = useState("");

  const [sessionToken, setSessionToken] = useState<string>("");
  const { push } = useNavigation();

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) => async (options: { page: number }) => {
      if (!sessionToken || sessionToken == "") {
        return { data: [], hasMore: false };
      }
      const newData = await fetchDestinations(searchText, options.page * 10, sessionToken);
      return {
        data: newData.items.map((it, i) => {
          it.page = options.page;
          it.text = it.name;
          it.index = i;
          return it;
        }),
        hasMore: options.page * 10 + 10 < newData.count,
      };
    },
    [searchText],
  );

  if (!sessionToken || sessionToken == "") {
    handleAuthStuff()
      .then(async (a) => {
        setSessionToken(a.sessionToken);
        setSearchText("e");
        await new Promise((r) => setTimeout(r, 100));
        setSearchText("");
      })
      .catch((error) => {
        showToast({
          style: Toast.Style.Failure,
          title: "Oops! Something went wrong with authentication",
          message: error.message,
        });
      });
  }

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchText={searchText}
      pagination={pagination}
      searchBarPlaceholder="Search for destinations..."
      actions={
        <ActionPanel>
          <Action title="Create One" onAction={() => push(<CreateDestination />)} />
        </ActionPanel>
      }
    >
      {data?.length === 0 ? (
        <List.EmptyView icon={Icon.Footprints} title="No destinations found for query. Create one?" />
      ) : (
        data?.map((item) => (
          <List.Item
            key={`${item.page} ${item.index} ${item.text}`}
            title={item.text}
            subtitle={item.type == "note" ? "Note" : item.location}
          />
        ))
      )}
    </List>
  );
}
