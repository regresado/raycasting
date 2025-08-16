import { useEffect, useState } from "react";
import { Icon, Action, ActionPanel, List, useNavigation, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";

import { fetchDestinations } from "./utils/destination";
import { fetchWorkspaces } from "./utils/workspace";
import { handleAuthStuff, setDefaultWorkspace } from "./utils/auth";
import CreateDestination from "./create-destination";

export default function ListDestinations() {
  const [searchText, setSearchText] = useState("");

  const [sessionToken, setSessionToken] = useState<string>("");
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<number | undefined>(undefined);
  const { push } = useNavigation();

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) => async (options: { page: number }) => {
      if (!sessionToken || sessionToken == "") {
        return { data: [], hasMore: false };
      }
      const newData = await fetchDestinations(searchText, options.page * 10, selectedWorkspace, sessionToken);

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

        setWorkspaces((await fetchWorkspaces(undefined, a.sessionToken)).items);
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
      isShowingDetail
      throttle
      navigationTitle={data && data.length > 0 ? `List Destinations (${data.length})` : "List Destinations"}
      actions={
        <ActionPanel>
          <Action title="Create One" onAction={() => push(<CreateDestination />)} />
        </ActionPanel>
      }
      searchBarAccessory={
        <List.Dropdown
          tooltip="Trunks"
          storeValue={true}
          defaultValue="all"
          onChange={(newValue) => {
            if (newValue === "all") {
              setSelectedWorkspace(undefined);
            } else {
              setSelectedWorkspace(parseInt(newValue));
            }
          }}
        >
          <List.Dropdown.Item title="All Trunks" value="all" />
          {workspaces.map((workspace) => (
            <List.Dropdown.Item
              key={workspace.id}
              title={(workspace.emoji ?? "🧰") + " " + workspace.name}
              value={workspace.id.toString()}
            />
          ))}
        </List.Dropdown>
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
            detail={
              <List.Item.Detail
                markdown={item.description}
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label title="Type" text={item.type} />
                    {item.type == "location" ? (
                      <List.Item.Detail.Metadata.Link title="Location" target={item.location} text={item.location} />
                    ) : null}

                    <List.Item.Detail.Metadata.TagList title="Trunk">
                      <List.Item.Detail.Metadata.TagList.Item text={"🧰 " + item.workspace.name} />
                    </List.Item.Detail.Metadata.TagList>

                    <List.Item.Detail.Metadata.Separator />

                    <List.Item.Detail.Metadata.TagList title="Tags">
                      {item.tags.map((tag) => (
                        <List.Item.Detail.Metadata.TagList.Item key={tag.id} text={tag.text} color={tag.color} />
                      ))}
                    </List.Item.Detail.Metadata.TagList>

                    <List.Item.Detail.Metadata.Label title="Archived?" text={item.archived ? "Yes" : "No"} />
                    <List.Item.Detail.Metadata.Separator />
                  </List.Item.Detail.Metadata>
                }
              />
            }
          />
        ))
      )}
    </List>
  );
}
