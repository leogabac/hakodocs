---
title: Linux: Settings
description: A compilation of useful linux settings
---

# Linux: Settings

This is a list of common settings one might want to change at some point

# Battery

TLP is a CLI for saving lapptop battery power.
```bash
sudo pacman -S tlp
```
then enable/start the service
```bash
sudo systemctl start tlp.service
sudo systemctl enable tlp.service
```


# GRUB

WIP

# SDDM

## High Resolution Displays

Following the [SDDM Arch Wiki Page](https://wiki.archlinux.org/title/SDDM). To scale the SDDM login screen, first create/edit the file

{: .codeblock data-title="/etc/sddm.conf.d/hidpi.conf"}
```
[Wayland]
EnableHiDPI=true

[X11]
EnableHiDPI=true
```

When using KDE Plasma, which has a Qt-based greeter, add the following
```
[General]
GreeterEnvironment=QT_SCREEN_SCALE_FACTORS=2,QT_FONT_DPI=192
```
