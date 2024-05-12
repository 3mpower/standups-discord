import { Update } from "./types";
import { getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";

const preferences = getPreferenceValues();

function getText(update: Update) {
  return JSON.stringify({
    content: null,
    embeds: [
      {
        title: "Yesterday",
        description: update.yesterday,
        color: 5814783,
        author: {
          name: preferences.name,
          icon_url: preferences.pfp,
        },
      },
      {
        title: "Today",
        description: update.today,
        color: 5814783,
        author: {
          name: preferences.name,
          icon_url: preferences.pfp,
        },
      },
      {
        title: "Blockers",
        description: update.blockers,
        color: 16734296,
        author: {
          name: preferences.name,
          icon_url: preferences.pfp,
        },
      },
    ],
    username: "Standup",
    attachments: [],
  });
}

export async function sendUpdate(update: Update) {
  try {
    const body = getText(update);

    const response = await fetch(preferences.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to send update. Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error sending update:", error);
    throw error;
  }
}
