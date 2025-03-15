---
title: Github
description: Github
---

# Git: GitHub

[GitHub](https://github.com/) is an online platform for hosting and managing Git repositories. It provides version control, collaboration tools, and integration with various development workflows. Developers use GitHub to store code, track changes, and collaborate on projects through features like pull requests, issues, and discussions. It also supports automation, continuous integration, and project management tools. While primarily used for software development, GitHub is also popular for documentation, research, and other collaborative projects.

# GitHub CLI

To push to a remote repository hosted on GitHub, you need to have access to it by either being invited or being the owner. Then, Git needs to authenticate your credentials to allow pushing your commits. The easiest way to manage authentication is by using the GitHub CLI (`gh`).

## Installation

- **Windows**

  Install with `winget`, open a terminal and run:

  ```bash
  winget install --id GitHub.cli
  ```

- **macOS**

  Install with `Homebrew`, open a terminal and run:

  ```bash
  brew install gh
  ```

- **Linux**

  Install using your package manager:

  - Debian/Ubuntu (apt)

  ```bash
  (type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  && cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update \
  && sudo apt install gh -y
  ```

  - Fedora

  ```bash
  sudo dnf config-manager addrepo --from-repofile=https://cli.github.com/packages/rpm/gh-cli.repo
  sudo dnf install gh --repo gh-cli
  ```

  - Arch Linux

  ```bash
  sudo pacman -S github-cli
  ```

## Authenticating with GitHub CLI

Once installed, you need to authenticate with GitHub:

- Open a terminal and run:

  ```bash
  gh auth login
  ```

- Select `GitHub.com` when prompted.
- Choose between authenticating via `HTTPS` or `SSH`. If unsure, `HTTPS` is the easier option.

  {: .note}

  > **Note:**\
  > HTTPS authentication will require a web browser. This is not useful for headless installations.

- If using HTTPS, you can authenticate via a web browser or a personal access token (PAT). The recommended way is to use the web authentication:

  - Select `Login with a web browser` and follow the instructions to authorize GitHub CLI.
  - If you prefer using a PAT, generate one from [GitHub's Personal Access Token page](https://github.com/settings/tokens), ensuring you enable `repo` scope.

- After authentication, verify that you're logged in by running:

  ```bash
  gh auth status
  ```

This will cache your credentials in Git, next time you run `git push origin`, it will already have access to your account.

## Useful commands for `gh`

Here is a list of commands you will find useful.

- **Cloning a repository:**
  ```bash
  gh repo clone <owner>/<repository>
  ```
- **Creating a new repository:**
  ```bash
  gh repo create <repository-name> --public
  ```
- **Viewing pull requests:**
  ```bash
  gh pr list
  ```
- **Checking notifications:**
  ```bash
  gh notifications
  ```

# GitHub Desktop

[GitHub Desktop](https://github.com/apps/desktop) is a graphical user interface (GUI) application that simplifies working with Git repositories. It allows users to clone repositories, commit changes, create branches, and push updates without using the command line.

## Installation

Follow the instructions in their [downloads page](https://desktop.github.com/download/)
