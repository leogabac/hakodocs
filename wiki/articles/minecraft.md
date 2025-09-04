---
title: "Minecraft"
description: "Minecraft"
---

# Minecraft

Swedish goodness.

## Installation

On Arch Linux, you can get the `minecraft-launcher` official launcher from the AUR.
```bash
yay -S minecraft-launcher
```

# Breaking Bugs

Here is a list on workarounds for knwon bugs.

- **Unexpected error when opening the launcher**

  As of March 18th 2025, there is a bug in which when opening `minecraft-launcher` from the AUR, it gives the following error

  > Whoops! An unexpected issue occurred; we are sorry for the inconvenience. Please try restarting your Launcher. If that does not resolve the issue, please log a bug report.

  As pointed out by Reddit user [SoulCommander12](https://www.reddit.com/r/archlinux/comments/1j0r8my/comment/mfnd5t7/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) in [r/archlinux](https://www.reddit.com/r/archlinux/comments/1j0r8my/minecraft_launcher_wont_start/), the issue is solved by deleting the directory `webcache2/`

  ```bash
  rm -r ~/.minecraft/webcache2/
  ```

  However, the launcher everytime it is opened it creates a new `webcache2/` directory. It will be necessary to delete it everytime you need ot open minecraft. Third party launchers like [`gdlauncher-bin`](https://aur.archlinux.org/packages/gdlauncher-bin) from the AUR work without issues.

# Installing mods

To install mods using [fabric](https://fabricmc.net/), it is necessary to install the modloader. On Linux, the preferred way is to use a third-party launcher like GDLauncher. On Arch Linux, install the package [`gdlauncher-bin`](https://aur.archlinux.org/packages/gdlauncher-bin) from the AUR and follow [their documentation](https://wiki.fabricmc.net/player:tutorials:install_gdlauncher:linux) for setting it up.

To use the official `minecraft-launcher`
1. Download the [universar JAR file](https://fabricmc.net/use/installer/)
2. Make sure to have a Java Runtime Environment installed. For Arch Linux, visit the [Java Arch Wiki Page](https://wiki.archlinux.org/title/Java)
3. Run the installer
```bash 
java -jar <fabric installer>.jar
````
After this is done, simply move the mods under `~/.minecraft/mods/`
