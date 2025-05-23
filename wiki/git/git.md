---
title: Git
description: Git
---

# Git

Git is a version control system that helps track changes in files, mainly used for coding projects. It allows multiple people to work on the same project without overwriting each other's work. With Git, you can save different versions of your project, go back to previous versions if needed, and collaborate easily. It works by storing changes in a repository, which can be kept on your computer or shared online using platforms like [GitHub](https://github.com/). It was created by [Linus Torvalds](https://github.com/torvalds), the creator of the Linux Kernel.

## Installation

- **Windows**

  There are a few options:

  1. Download the wizard from the [git downlods page](https://git-scm.com/downloads/win), execute it and follow the instructions.
  2. Use `winget`, i.e. open your terminal and execute the following command

  ```cmd
  winget install --id Git.Git -e --source winget
  ```

- **MacOS**

  Open a terminal and try to run the `git` command. MacOS will prompt you to install the XCode command line tool which will install `git` and other developer tools as well.

- **Linux**

  Install it with your package manager, on Arch Linux

  ```bash
  sudo pacman -S git
  ```

## Quick Tutorial

In this section, you will learn the typical Git workflow with the commands `git init`, `git add`, and `git commit` for a local repository. Then we will briefly mention how to `git push` to a remote repository that could be hosted on an online platform like _GitHub_ or _GitLab_.

### Initializing (or cloning) a Repository

First, to work with Git, you need a _Git repository_, which is a directory for your project that will be managed with Git. To create one, move to your project's directory and run the command:

```bash
git init
```

When you run `git init`, it creates a new subdirectory named `.git` in your current working directory. This directory contains all the necessary Git metadata for the new repository, including subdirectories for objects, references, and template files. It is a _special_ directory that Git and other programs use to recognize the directory as a Git repository.

Alternatively, if the repository already exists somewhere, you can instead clone it by providing the URL

```bash
git clone <repository-url>
```

{: .note}

> **Note:**\\
> If the repository has submodules, you can add the flag
>
> ```bash
> git clone <repository-url> --recurse-submodules
> ```

### Staging and Committing Changes

After creating a _repository_ you can keep working as usual. Add, modify and remove files from your code as you wish, until you want to _commit_ your changes, that is, create a snapshot of the current state of the project to the project's history so that you can check it out later.

To create a commit, you need to first _track_ and _stage_ your changes. That is, Git needs to know which files it needs to look for changes before making a commit. You can know which files are being tracked and which are not, as well as other information, by running the command:

```bash
git status
```

From here, you can decide which files to _track_ and _stage_ for your upcoming commit. As a simple example, you can add _all_ of the modified files with the following command:

```bash
git add .
```

{: .warning}

> **Warning:**\\
> Adding all of the files is commonly unwanted and not recommended, as it can unintentionally include temporary files, logs, or other files that should not be committed. Most of the time, it is preferable to manually add specific files and _bundle_ them under a single commit:
>
> ```bash
> git add <filename>
> ```
>
> You can repeat this command as many times as needed to _bundle_ all of your desired files under a single commit. You can also make separate commits for individual files when necessary. Alternatively, if you want to interactively choose files, you can use:
>
> ```bash
> git add -p
> ```
>
> This allows you to review changes before staging them, which can help maintain a cleaner commit history.

After staging the files, you need to save the changes to the repository with a commit:

```bash
git commit -m "Your commit message"
```

The commit message should describe the changes you made, making it easier to track the project's history.

### Pushing to a Remote Repository

If you want to back up your project or collaborate with others, you can push your changes to a remote repository, i.e. a repository that is hosted in some online/cloud platform like Github. First, you need to add a remote repository URL:

```bash
git remote add origin <repository-url>
```

{: .note}

> **Note:**\\
> If your repository was cloned directly from the cloud platform. It will already have this information added. You can skip this step.

Then, you can push your changes using:

```bash
git push -u origin <branch>
```

Here `<branch>` is typically `main`.

{: .note}

> **Note:**\\
> If your repository was cloned directly from the cloud platform. Just run
>
> ```bash
> git push origin <branch>
> ```

This command uploads your commits to the remote repository and sets up tracking so future pushes can be done with `git push`.

### The workflow in a nutshell

The following steps summarize what you will be doint 90% of the times with git.

1. Initialize/clone a repository: `git init` or `git clone`
2. Add files to the staging area: `git add <filename>` or `git add .`
3. Commit changes: `git commit -m "message"`
4. Push changes: `git push origin main`

There is a lot more to know about git, but you can learn the specific features as you need them.

# Branches

Branches allow parallel development without affecting the main code.

- Create a new branch:

  ```bash
  git branch <branch-name>
  ```

- Switch to a branch:

  ```bash
  git checkout <branch-name>
  ```

- Create and switch to a new branch:

  ```bash
  git checkout -b <branch-name>
  ```

- List branches:

  ```bash
  git branch
  ```

- Merge a branch into the current one:

  ```bash
  git merge <branch-name>
  ```

- Delete a branch:
  ```bash
  git branch -d <branch-name>  # Safe delete (only if merged)
  git branch -D <branch-name>  # Force delete
  ```

- Checkout a previous commit (detached HEAD):
  ```bash
  git checkout <commit-hash>
  ```

# Ignoring Files

To prevent certain files from being tracked by Git, create a `.gitignore` file in the repository root and list the files or directories to ignore.

```
# Ignore compiled files
*.o
*.exe

# Ignore logs
logs/
*.log

# Ignore environment files
.env
```

To apply changes after modifying `.gitignore`, use:

```sh
git rm --cached <file>
```



# See also

- [Github](git.github)
