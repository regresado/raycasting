# 🔷 Regreso for Raycast

Welcome to Regreso for Raycast. This README primarily serves to help other developers setup, run, and collaborate the Regreso Raycast extension!

## 👋 Introduction

Ever find yourself wanting to come back to an article, video, link, or manual at a later time but never actually doing it? (Regreso might be for you!) Or constantly having to launch the Regreso web [platform](https://regreso.netlify.app) everytime you find something amazing?

### 🤔 What's the Solution?

This extension, obviously, but why? First off, Raycast is a super epic MacOS/Windows app that allows you to quickly execute commands to do things like launch apps, find files, perform simple calculations, translate text, etc from the comfort of a conveniently-shortcutted command palette. But this extension gives you the added power of **saving your links and richly-formatted notes**. Additionally, with features not supported on the Regreso platform (such as drafts), this extension will go farther to become an important client platform.

### 💪 Example Use Cases

- You somehow ended up with 50 tabs generated from some niche rabbit-hole research on a topic and need to quickly organize them all into maps and workspaces.
- You use multiple machines regularly and want to be able to access your saved resources across browsers or (without) a browser.

## 🚀 Usage

To run this extension, simply:

1. Clone this repository to your device using `git clone` and navigate (`cd`) into it, and run the `npm run dev` script,
2. launch Raycast like usual and search for the "Regreso Login" command
3. Fill in your regreso account email/password (you can create one [here](https://regreso.netlify.app/sign-up)) and submit.
4. Start using Regreso for Raycast! You can use the commands described in

## 🛠️ Developing

Some useful commands when developing this extension include:

- `npm run dev` / `npm run build`
- `npm run lint` / `npm run fix-lint`
- `npm run release`

## ⌨️ Commands

A list of the current commands available in the extension.

- Log In
- Create Destination
- List Destinations

## 🗺️ TODOs

> [!IMPORTANT]
> The most difficult thing about the Regreso Raycast extension is authentication. Because the extension serves not simply as a map RSS-feed-reader and enables all sorts of mutational procedures, we need to be careful. However, until Regreso has its own OAuth support (coming soon I promise!), this extension will remain in an alpha/beta stage.

- [ ] Auth
  - [ ] Support Regreso OAuth
- [ ] Support destination commands
  - [ ] Support creating destinations
  - [ ] Support listing/searching destinations
  - [ ] Support
  - [ ] Support saving destination drafts

- [ ] Support map commands
  - [ ] Support creating maps
  - [ ] Support listing/searching maps
  - [ ] Support opening maps (listing destinations)

- [ ] Release Stuff
  - [ ] Test on MacOS
  - [ ] CI/CD GitHub Actions (CI-only for now)
  - [ ] Publish to Raycast Extension Store
