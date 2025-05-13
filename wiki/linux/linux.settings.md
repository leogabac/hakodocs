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

- **Remaking the GRUB configuration file**

Not a setting _per se_, but it is useful to have this command at hand somewhere.
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

- **Show logs**

To show the kernel logs on boot for a _hacker_ feeling, edit the `GRUB_CMDLINE_LINUX_DEFAULT` variable in your GRUB configuration to contain a `loglevel`.

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=3"
```

Make sure to remove `splash` or `quiet` if they appear.

- **Make GRUB remember last launched entry**

It is very helpful, specially when dual booting, to make GRUB default to the last launched entry. To do this, edit your GRUB configuration to contain

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

- **Make a custom font**
- **Add a theme to GRUB**

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
