---
title: Arch Linux
description: Arch Linux
---

# Arch Linux

Arch Linux is a _rolling-release_ distribution, i.e. _packages_ (software) receive updates constantly. There is not a concensus on how often one needs to update their system, a good rule of thumb is once per week.


{: .tip}
>If case something happens, **always** check the [Arch Wiki](https://wiki.archlinux.org/title/Main_page) first. It always help, no matter the problem you may have. Read **very** carefully the instructions, and don't skip steps. I have encountered many problems for literally not reading the next line in the wiki.

This guide serves as both a beginner guide to know that to check after they install Arch Linux for the first time, but also a checklist for myself to remember what to look for in a new installation. I will assume that you installed KDE Plasma as your Desktop Environment.

## The package Manager

As in any Linux distribution, Arch Linux has a _package manager_ called `pacman` that installs software from the _Arch repository_ . Package names may differ from other distributions, so it is recommended that you check on the [repositories](https://archlinux.org/packages/) or the [Arch Wiki](https://wiki.archlinux.org/title/Main_page) how to install particular software.

To install packages simply run

```bash
sudo pacman -S PACKAGE_NAME
```

where the `-S` flag stands for _Sync_. It basically reads

> Sync from the pacman (Arch) repository PACKAGE_NAME with my system

## The Arch User Repository

Not every piece of software can be found in the regular Arch repositories. Take for example `dropbox`, that has official support for Debian/Ubuntu, but not for Arch Linux. Another example would be software that need to be _compiled from source_ like `lammps`, `gromacs` or some of the `xp-pen` drivers for their tablets. Manually repackaging, or compiling from source will install the software on your system at the cost of not being properly managed by `pacman`. On such cases we turn to the so-called _Arch User Repository_ (AUR).

The Arch User Repository (AUR) is a community-driven repository for Arch Linux that allows users to share and install packages not available in the official Arch repositories. Unlike the official repos, which provide precompiled binaries, the AUR contains _PKGBUILD_ scripts—text files that define how to download, compile, and install software from source or external sources like .deb packages. Users can manually download a PKGBUILD and run `makepkg -si` to build and install the package, or use an _AUR helper_ like `yay` or `paru` to automate the process. Since AUR packages are maintained by the community, they are not officially supported by Arch and may require user intervention if dependencies or builds break.

To install `yay` as an AUR helper, run

```bash
sudo pacman -S --needed base-devel git
mkdir /tmp/yay
git clone https://aur.archlinux.org/yay.git /tmp/yay
cd /tmp/yay
makepkg -si
```

Then from the AUR, we can install with same flags as in `pacman`

```bash
yay -S PACKAGE_NAME
```

When yay installs an AUR package, it first downloads the _PKGBUILD_ script, builds the package into a `.pkg.tar.zst` file, and then installs it using `pacman -U`. Since pacman tracks all installed packages in its local database (/var/lib/pacman/), the AUR package becomes indistinguishable from an official package in terms of management. This means `pacman -Q` can list it, `pacman -R` can remove it, and `pacman -U` can reinstall it.

Because AUR packages are not in the official repositories, `pacman -Syu` does not update them—users must manually rebuild them or use an AUR helper like `yay -Syu`, which automates the update process by fetching new _PKGBUILD_ versions and repeating the build-and-install process.

## Full System Upgrade

Arch Linux receives constant updates, to make a _full system upgrade_ run

```bash
sudo pacman -Syu
```

{: .warning}
>Always make sure to read what packages are being updated.

# System Sanity Check

First thing, is that we need to check if all basic functionalities are working properly. In some sections I don't have any particular advice, as they usually work out of the box. In such cases, I will simply provide a link to their ArchWiki page.

## Network

- **For general troubleshooting** visit [Network configuration](https://wiki.archlinux.org/title/Network_configuration/Wireless) on the ArchWiki.

## Sound

- **For general troubleshooting** visit [Sound system](https://wiki.archlinux.org/title/Sound_system) on the ArchWiki.

- **Microphone is not detected on some Lenovo Laptops**

  On some Lenovo laptops, e.g. ThinkPad T14 Gen 2, the built-in microphone was not properly detected.

  A solution was found in [this Reddit post](https://www.reddit.com/r/archlinux/comments/13hca34/microphone_is_not_detected/?share_id=ex0_FTMc98thXfpI1To3q&utm_content=2&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=3) by user `4bjmc881`, who identified that the issue was related to the audio driver being loaded by the system. By default, the system attempts to use the `snd-hda-intel` driver. However, for newer devices (from 2019 onwards), the `sof-audio-pci-intel-cnl` driver is more appropriate. To ensure that the correct driver is loaded, the `snd-hda-intel` driver must be blacklisted.\

  To solve the issue, create or edit the modprobe config at `/etc/modprobe.d/blacklist.conf` and add the following content

  ```
  blacklist snd_hda_intel
  ```

  After reboot, the kernel loads the driver and the microphone is detected correctly.

## Bluetooth

- **For general troubleshooting** visit [Bluetooth headset](https://wiki.archlinux.org/title/Bluetooth_headset) on the ArchWiki.

- **General bluetooth capabilities**

  ```bash
  sudo pacman -S bluez bluez-utils bluez-deprecated-tools
  ```

  Typically the Bluetooth Services is not enabled by default.

  ```bash
  sudo systemctl start bluetooth.service
  sudo systemctl enable bluetooth.service
  ```

  Sometimes you will need to reboot your PC for everything to work properly.

## Keyboard Backlight

- **For general troubleshooting** visit [Keyboard backlight](https://wiki.archlinux.org/title/Keyboard_backlight) on the Archwiki.

- **The frontend that controls the backlight is not installed**

  ```bash
  sudo pacman -S brightnessctl
  ```

  If that does not solve it, check the Archwiki.

## Screenshots

- **The software that takes screenshots is not installed**

  For KDE Plasma use `spectacle`.

  ```bash
  sudo pacman -S spectacle
  ```

## Monitors

In particular, check that

1. All monitors connect correctly, in particular those that use Thunderbolt/USB4.
2. All monitors run at their respective refresh rate.

## Graphics Card

There are a few ways to make sure your dedicated graphics card is working.

- **Card Is Detected**

  1. In KDE Plasma, look for the _About_ setting, it should list all of your components.
  2. Using fastfetch

  ```bash
  sudo pacman -S fastfetch
  fastfech
  ```

  3. Using `lspci`

  ```bash
  lspci | grep -i vga
  ```

- **OpenGL Renderer**

  You can check the default OpenGL rendered for your system to make sure which card is currently being used

  ```bash
  glxinfo | grep "OpenGL renderer"
  # OpenGL renderer string: AMD Radeon RX 6650M (radeonsi, navi23, LLVM 19.1.6, DRM 3.59, 6.12.9-arch1-1)
  ```

  This will list the current renderer and used driver. If it is not the correct one, you can force it with the `DRI_PRIME` environment variable.

  ```bash
  DRI_PRIME=1 glxinfo | grep "OpenGL renderer"
  # OpenGL renderer string: AMD Radeon 780M (radeonsi, gfx1103_r1, LLVM 19.1.6, DRM 3.59, 6.12.9-arch1-1)
  ```

  As a final sanity check, a good way to _really_ make sure your card is working is by launching minecraft. You can install it from the AUR

  ```bash
  yay -S minecraft-launcher
  ```

  In a world, press F3 and check the _display_ information on the right side. If you see the incorrect graphics card, change Plasma to use the other one as default, or force the application launcher to use the correct `DRI_PRIME` variable state. I am not sure on how this is configured, typically after a few restards, Plasma always decides to use the dedicated graphics.

# Text Editor

## VSCode

There are many text editors on Linux. VSCode is a Microsoft editor with enabled telemetry, Linux users do not like that for privacy concerns. VSCodium is a community open-source release that nullifies telemetry, and is available in the AUR. For Arch Linux, there is an official OSS release

```bash
sudo pacman -S code
```

For more information, read the [VSCode Arch Wiki Page](https://wiki.archlinux.org/title/Visual_Studio_Code).

## Neovim

I personally use `nvim` with my own configuration.

```bash
sudo pacman -S nvim
git clone https://github.com/leogabac/leovim.git ~/.config/nvim
nvim
```

Check the [leovim repository](https://github.com/leogabac/leovim) for more information.

# See also

There are other tools you might be interested in checking out. Here are some of them (Available on this Wiki)

- [Linux: Settings](linux.settings): A list of common settings for Linux.
- [Python](python): Installation, virtual environments, handling versions.
- [Timeshift](timeshift): Tool for creating system snapshopts. Similar to MacOS TimeMachine.
- [LaTeX](latex): Typesetting system.
