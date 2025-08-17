# 🔷 Regreso for Raycast

[![wakatime](https://wakatime.com/badge/user/7482ea9d-3085-4e9b-95ad-1ca78a14d948/project/de8e3865-61b8-47e9-8f80-dbc6224ca070.svg)](https://wakatime.com/badge/user/7482ea9d-3085-4e9b-95ad-1ca78a14d948/project/de8e3865-61b8-47e9-8f80-dbc6224ca070)

Welcome to Regreso for Raycast. This README primarily serves to help other developers setup, run, and collaborate the Regreso Raycast extension!

## 💬 Introduction

Ever find yourself wanting to come back to an article, video, link, or manual at a later time but never actually doing it? (Regreso might be for you!) Or find yourself constantly having to launch the Regreso web [platform](https://regreso.netlify.app) every time you stumble across something amazing?

### 🤔 What's the Solution?

This extension (obviously) but why?

1. Raycast is a super epic MacOS/Windows app that allows you to quickly execute commands to do things like launch apps, find files, perform simple calculations, translate text, etc from the comfort of a conveniently-shortcutted command palette.
2. This extension gives you the added power of **saving links and richly-formatted notes you wish to return to later**. Additionally, with planned features not supported on the Regreso platform (such as drafts and browser integration), this extension will become an important platform client.

### 💪 Example Use Cases

- You somehow ended up with a boatload of tabs generated during a niche rabbit-hole research session on a variety of topics and need to quickly organize them all into maps and workspaces for future reference.
- You use multiple machines (or browsers) regularly and want to be able to access your saved resources across browsers or (without) a browser at all.

## 📺 Demo & Setup Video

https://github.com/user-attachments/assets/d10b786e-c00c-476f-9634-c253c732ee52

## 🚀 Getting Started

> [!WARNING]
> This extension is only tested on Windows but should work cross-platform. Feel free to try on MacOS and if you encounter any problems, file an issue!

To get started with this extension, follow these steps:

1. **Clone this repository** to your device using `git clone https://github.com/matmanna/raycasting.git` and **cd into it**: `cd raycasting`
2. **Run install script**: `npm install`, then **run the development script**: `npm run dev` (once it's successfully running, feel free to press `Ctrl+C` or close the terminal window)
3. **Open Raycast** like usual (`alt+space` maybe?) and **search for "Settings"**. In the Regreso settings menu (from the left sidebar), **fill in your account credentials** (you can create one by signing up with email/password [here](https://regreso.netlify.app/sign-up)) and **close settings**.
4. **Start using Regreso for Raycast!** You can use the commands described below or search "regreso" globally in Raycast.

## ⌨️ Commands

A list of the current commands available in the extension:

- Create Destination
- List Destinations

## ⚙️ Configuration

The following configuration preferences can be set:

- Instance URL (optional), **Default: https://regreso.netlify.app**: If self-hosting Regreso, enter your instance's web address here.
- Email (mandatory): If using session id auth, just write something random in this field.
- Password (mandatory): : If using session id auth, just write something random in this field.
- Session ID (optional) Optional but overrides email/password fields in favor of a statically-provided session ID
- AI Tagging: Disabled by default which will be used to generate destination tags.
- AI Instance: Defaults to `https://ai.hackclub.com`; If AI tagging is enabled, this URL will be used to send auto-tagging requests. (future authentication config will be available)

## 🐛 Bugs and Features

If you find a bug with Regreso itself, file it under the main repo's [issues](https://github.com/matmanna/Regreso). Otherwise, for client-specific problems or suggestions, create an issue on this repository!

## 🗺️ Roadmap

The following TODOs serve as the main project-planning source for this repository:

### ☑️ TODOs

- [ ] Auth
  - [x] basic email/password or session token
  - [ ] Support Regreso OAuth (better)
- [ ] Support destination commands
  - [x] Support creating destinations
    - [x] scraped metadata
    - [ ] basic ai tagging
      - [ ] authenticated ai tagging
      - [ ] local ai tagging
    - [ ] with arguments
    - [ ] searchable tagpicker
    - [ ] Support browser tab integrations
    - [ ] Support browser bookmarks integrations
    - [ ] Store submitted dests locally in some sort of SQL sync-outbox if no internet connection available
    - [ ] Support saving destination drafts (somehow differentiation from sync waitlist)
  - [x] Support listing/searching destinations
    - [x] List item details
    - [ ] Hide details action (& preferences)

- [ ] Support map commands
  - [ ] Support creating maps
  - [ ] Support listing/searching maps
  - [ ] Support opening maps (listing destinations)

- [ ] Release Stuff
  - [ ] Test on MacOS
  - [ ] CI/CD GitHub Actions (CI-only for now)
  - [ ] Publish to Raycast Extension Store
