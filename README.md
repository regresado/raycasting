# 🔷 Regreso for Raycast

[![wakatime](https://wakatime.com/badge/user/7482ea9d-3085-4e9b-95ad-1ca78a14d948/project/de8e3865-61b8-47e9-8f80-dbc6224ca070.svg)](https://wakatime.com/badge/user/7482ea9d-3085-4e9b-95ad-1ca78a14d948/project/de8e3865-61b8-47e9-8f80-dbc6224ca070)

Welcome to Regreso for Raycast. This README primarily serves to help other developers setup, run, and collaborate the Regreso Raycast extension!

## 💬 Introduction

Ever find yourself wanting to come back to an article, video, link, or manual at a later time but never actually doing it? (Regreso might be for you!) Or find yourself constantly having to launch the Regreso web [platform](https://regreso.netlify.app) every time you stumble across something amazing?

### 🤔 What's the Solution?

This extension (obviously) but why? First off, Raycast is a super epic MacOS/Windows app that allows you to quickly execute commands to do things like launch apps, find files, perform simple calculations, translate text, etc from the comfort of a conveniently-shortcutted command palette. But this extension gives you the added power of **saving your links and richly-formatted notes**. Additionally, with planned features not supported on the Regreso platform (such as drafts), this extension will hopefully become an important platform client.

### 💪 Example Use Cases

- You somehow ended up with 50 tabs generated from some niche rabbit-hole research on a topic and need to quickly organize them all into maps and workspaces.
- You use multiple machines regularly and want to be able to access your saved resources across browsers or (without) a browser at all.

## 📺 Demo & Setup Video

> [!WARNING]
> This extension is only tested on Windows but should work cross-platform. Feel free to try on MacOS and if you encounter any problems, file an issue!

https://github.com/user-attachments/assets/d10b786e-c00c-476f-9634-c253c732ee52

## 🚀 Getting Started

To run this extension, simply:

1. Clone this repository to your device using `git clone`, navigate (`cd`) into it, install dependencies (`npm install`), run the `npm run dev` script, and once it's running, press `Ctrl+C` to stop the dev command (extension will stay installed).
2. Launch Raycast like usual (`alt+space` maybe?) and search for "Settings". Inside of the Regreso settings menu (from the sidebar), fill in your regreso account credentials (you can create one by signing up with email/password [here](https://regreso.netlify.app/sign-up)) and close settings.
3. Start using Regreso for Raycast! You can use the commands described below or search "regreso" globally in Raycast.

### 🔃 Updating

Instructions on updating coming soon...

## ⌨️ Commands

A list of the current commands available in the extension.

- Create Destination
- List Destinations

## ⚙️ Configuration

The following configuration preferences can be set:

- Instance URL (optional), **Default: https://regreso.netlify.app**: If self-hosting Regreso, enter your instance's web address here.
- Email (mandatory): If using session id auth, just write something random in this field.
- Password (mandatory): : If using session id auth, just write something random in this field.
- Session ID (optional) Optional but overrides email/password fields in favor of a statically-provided session ID
- Auto Tagging (under Create Destination): Disabled by default, you can provide an AI api url (more specifications coming soon) which will be used to generate destination tags.

## 🐛 Bugs and Features

If you find a bug with Regreso itself, file it under the main repo's [issues](https://github.com/matmanna/Regreso). Otherwise, for client-specific problems or suggestions, create an issue on this repository!

## 🗺️ Roadmap

### ☑️ TODOs

- [ ] Auth
  - [x] basic email/password or session token
  - [ ] Support Regreso OAuth
- [ ] Support destination commands
  - [x] Support creating destinations
    - [x] scraped metadata
    - [ ] with arguments
    - [ ] searchable tagpicker
    - [ ] Support browser tab integrations
    - [ ] Support browser bookmarks integrations
    - [ ] Support saving destination drafts
  - [x] Support listing/searching destinations
    - [x] List item details
    - [ ] Hide details action (& preferences)

- [ ] Support map commands
  - [ ] Support creating maps
  - [ ] Support listing/searching maps
  - [ ] Support opening maps (listing destinations)

- [ ] Store some data locally (SQL)

- [ ] Release Stuff
  - [ ] Test on MacOS
  - [ ] CI/CD GitHub Actions (CI-only for now)
  - [ ] Publish to Raycast Extension Store
