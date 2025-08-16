import { useState, useEffect, useRef } from "react";

import { Action, ActionPanel, Form, popToRoot, LaunchProps, Toast, showToast, getPreferenceValues } from "@raycast/api";
import { useForm } from "@raycast/utils";

import { getWebDetails } from "@regreso/utils";

import { handleAuthStuff } from "./utils/auth";
import { createDestination } from "./utils/destination";
import { fetchWorkspaces } from "./utils/workspace";

interface DestinationTypeFormValues {
  type: string;
  location?: string | undefined;
}

interface DestinationFormValues {
  headline: string;
  body?: string;
  location?: string | undefined;
  type: string;
  tags?: string;
  workspaceId?: string;
}

interface Workspace {
  name: string;
  id: number;
}

export default function CreateDestination(
  props: LaunchProps<{ arguments: Arguments.CreateDestination; draftValues: DestinationFormValues }>,
) {
  const preferences = getPreferenceValues<Preferences>();
  const [sessionToken, setSessionToken] = useState<string>("");
  const [defaultWorkspace, setDefaultWorkspace] = useState<number>(0);

  const tagsInputRef = useRef<Form.TextField>(null);

  if (!sessionToken || sessionToken == "") {
    handleAuthStuff()
      .then((a) => {
        setSessionToken(a.sessionToken);
        setDefaultWorkspace(a.defaultWorkspace);
      })
      .catch((error) => {
        showToast({
          style: Toast.Style.Failure,
          title: "Oops! Something went wrong with authentication",
          message: error.message,
        });
      });
  }

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  useEffect(() => {
    if (workspaces.length > 0 || sessionToken == "") {
      return;
    }
    fetchWorkspaces(false, sessionToken)
      .then((workspacesResponse) => {
        if (!workspacesResponse || !workspacesResponse.items) {
          showToast({
            style: Toast.Style.Failure,
            title: "Failed to fetch workspaces",
            message: "Please check your network connection or try again later.",
          });
          return;
        }
        if (workspacesResponse.items.length === 0) {
          showToast({
            style: Toast.Style.Failure,
            title: "No workspaces found",
            message: "Please create a workspace before creating a destination.",
          });
          return;
        }
        setWorkspaces(
          workspacesResponse.items.map((workspace: any) => {
            return { name: workspace.name, id: workspace.id };
          }),
        );
      })
      .catch((error) => {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to fetch workspaces",
          message: error.message,
        });
      });
  }, [setWorkspaces, sessionToken]);
  const { title, url, trunk } = props.arguments ?? { title: "", url: "", trunk: undefined };

  const { itemProps: destinationTypeProps } = useForm<DestinationTypeFormValues>({
    initialValues: props.draftValues || {
      type: "location",
      location: url || "",
    },
    onSubmit: () => {},
  });

  const { itemProps: destinationProps } = useForm<DestinationFormValues>({
    initialValues: props.draftValues || {
      type: "location",
      location: url || undefined,
      headline: title || "",
      body: "",
      tags: "",
      workspaceId: trunk ?? defaultWorkspace ?? "0",
    },
    onSubmit: () => {},
  });

  return (
    <>
      <Form
        enableDrafts
        actions={
          <ActionPanel>
            {(destinationTypeProps.type.value == "note" && destinationProps.headline.value != "") ||
            (destinationProps.type.value == "location" &&
              destinationProps.location.value != "" &&
              destinationProps.location.value != undefined) ? (
              <Action.SubmitForm
                title="Submit"
                onSubmit={() => {
                  createDestination(
                    destinationProps.headline.value ?? "New Destination",
                    destinationTypeProps.type.value == "location" ? "location" : "note",
                    destinationProps.body.value,
                    destinationTypeProps.location.value,
                    destinationProps.tags.value ?? "",
                    destinationProps.workspaceId.value ?? defaultWorkspace.toString(),
                    sessionToken,
                  )
                    .then(async () => {
                      showToast({
                        style: Toast.Style.Success,
                        title: "Success!",
                        message: "Destination created successfully",
                      });
                      await new Promise((r) => setTimeout(r, 500));
                      popToRoot();
                    })
                    .catch((error) => {
                      showToast({
                        style: Toast.Style.Failure,
                        title: "Oops! Something went wrong while creating the destination",
                        message: error.message,
                      });
                    });
                }}
              />
            ) : null}
            {destinationTypeProps.type.value == "location" &&
            (destinationProps.location.value == "" ||
              !destinationProps.location.value ||
              destinationProps.location.value != destinationTypeProps.location.value) ? (
              <Action
                title="Generate Site Metadata"
                onAction={async () => {
                  if (
                    destinationTypeProps.type.value == "location" &&
                    destinationTypeProps.location.value != destinationProps.location.value &&
                    destinationTypeProps.location.value != undefined &&
                    destinationTypeProps.location.value != ""
                  ) {
                    const webDetails = await getWebDetails(destinationTypeProps.location.value);
                    if (
                      !destinationProps.location.onChange ||
                      !destinationTypeProps.location.onChange ||
                      !destinationProps.headline.onChange ||
                      !destinationProps.body.onChange ||
                      !destinationProps.type.onChange ||
                      !destinationTypeProps.type.onChange
                    ) {
                      return;
                    }
                    destinationProps.type.onChange("location");
                    destinationProps.headline.onChange(
                      webDetails.title[0] ??
                        webDetails.title[1] ??
                        webDetails.title[2] ??
                        destinationTypeProps.location.value ??
                        "",
                    );
                    destinationProps.body.onChange(
                      webDetails.description[0] ?? webDetails.description[1] ?? (webDetails.description[2] || ""),
                    );
                    destinationProps.location.onChange(webDetails.url);
                    destinationTypeProps.location.onChange(webDetails.url);
                    tagsInputRef.current?.focus();
                  }
                }}
              />
            ) : null}
          </ActionPanel>
        }
      >
        <Form.Dropdown title="Type" {...destinationTypeProps.type}>
          <Form.Dropdown.Item value="location" title="Location" />
          <Form.Dropdown.Item value="note" title="Note" />
        </Form.Dropdown>
        {destinationTypeProps.type.value == "location" && (
          <Form.TextField
            title="Location"
            placeholder="https://pelicans.dev"
            {...destinationTypeProps.location}
            autoFocus
            info="A web resource's URL location"
          />
        )}

        {((destinationProps.type.value == "location" &&
          destinationProps.location.value &&
          destinationProps.location.value != "") ||
          destinationTypeProps.type.value == "note") && (
          <>
            <Form.TextField title="Headline" placeholder="A headline for your note" {...destinationProps.headline} />

            <Form.TextArea title="Body" placeholder="Write your note here..." {...destinationProps.body} />

            <Form.TextField
              title="Tags"
              placeholder="tag1, tag2, tag3"
              info="To auto-generate these, enable AI tagging"
              ref={tagsInputRef}
              {...destinationProps.tags}
            />

            <Form.Dropdown title="Workspace ID" {...destinationProps.workspaceId}>
              {workspaces.map((workspace) => (
                <Form.Dropdown.Item value={workspace.id.toString()} key={workspace.id} title={workspace.name} />
              ))}
            </Form.Dropdown>
          </>
        )}
      </Form>
    </>
  );
}
