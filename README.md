# 🔷 Regreso for Raycast

[![wakatime](https://wakatime.com/badge/user/7482ea9d-3085-4e9b-95ad-1ca78a14d948/project/de8e3865-61b8-47e9-8f80-dbc6224ca070.svg)](https://wakatime.com/badge/user/7482ea9d-3085-4e9b-95ad-1ca78a14d948/project/de8e3865-61b8-47e9-8f80-dbc6224ca070)

Welcome to Regreso for Raycast. This README primarily serves to help other developers setup, run, and collaborate the Regreso Raycast extension!

## 👋 Introduction

Ever find yourself wanting to come back to an article, video, link, or manual at a later time but never actually doing it? (Regreso might be for you!) Or constantly having to launch the Regreso web [platform](https://regreso.netlify.app) everytime you find something amazing?

### 🤔 What's the Solution?

This extension, obviously, but why? First off, Raycast is a super epic MacOS/Windows app that allows you to quickly execute commands to do things like launch apps, find files, perform simple calculations, translate text, etc from the comfort of a conveniently-shortcutted command palette. But this extension gives you the added power of **saving your links and richly-formatted notes**. Additionally, with features not supported on the Regreso platform (such as drafts), this extension will go farther to become an important client platform.

### 💪 Example Use Cases

- You somehow ended up with 50 tabs generated from some niche rabbit-hole research on a topic and need to quickly organize them all into maps and workspaces.
- You use multiple machines regularly and want to be able to access your saved resources across browsers or (without) a browser.

## 📺 Demo Video & Setup Tutorial

## 🚀 Usage

To run this extension, simply:

1. Clone this repository to your device using `git clone` and navigate (`cd`) into it, and run the `npm run dev` script,
2. launch Raycast like usual and search for the "Regreso Login" command
3. Fill in your regreso account email/password (you can create one [here](https://regreso.netlify.app/sign-up), but make sure to use email/password!) and submit.
4. Start using Regreso for Raycast! You can use the commands described in

## 🛠️ Developing

Some useful commands when developing this extension include:

- `npm run dev` / `npm run build`
- `npm run lint` / `npm run fix-lint`
- `npm run release`

## ⌨️ Commands

A list of the current commands available in the extension.

- Create Destination
- List Destinations

## ⚙️ Configuration

> [!IMPORTANT]
> Only email/password account auth is fully supported by this client! Whilst GitHub login can be used through a session ID, obtained from session cookie, this will eventually expire and may eventually be deprecated from this extension.

The following configuration preferences can be set:

- Instance URL (optional), **Default: https://regreso.netlify.app**: If self-hosting Regreso, enter your instance's web address here.
- Email (mandatory): If using session id auth, just write something random in this field.
- Password (mandatory): : If using session id auth, just write something random in this field.
- Session ID (optional) Optional but overrides email/password fields in favor of a statically-provided session ID.

## 🗺️ ROADMAP

### 📝 A note about auth

The most complicated thing about the Regreso Raycast extension is the need for secure, simple authentication. Because the extension doesn't just serve as an RSS-feed-reader but enables mutational procedures as well, caution is important.

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
    - [ ] List item details

- [ ] Support map commands
  - [ ] Support creating maps
  - [ ] Support listing/searching maps
  - [ ] Support opening maps (listing destinations)

- [ ] Store some data locally (SQL)

- [ ] Release Stuff
  - [ ] Test on MacOS
  - [ ] CI/CD GitHub Actions (CI-only for now)
  - [ ] Publish to Raycast Extension Store
