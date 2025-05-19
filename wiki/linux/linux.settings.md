---
title: Linux: Settings
description: A compilation of useful linux settings
---

# Linux: Settings

This is a list of common settings one might want to change at some point

# Battery

## Using TLP
TLP is a common linux utility for improving battery life. Some things that you can do are:
- Enable performance/powersave modes when on AC and Battery automatically.
- Enable _advanced_ powersaving features like USB autosuspend, ACPI sleep states, LAN, Wifi, and more.
- Enables the setup of battery thresholds.

See the [Hakodocs' TLP section](linux.dump#TLP) for more information on the installation process and setup. Additionally, you can read the [TLP documentation](https://linrunner.de/tlp/index.html).


## Using PPD

The Power Profiles Daemon (DDP) is a common, and simple way to manage power profiles on Linux with no configuration. On Arch Linux:
```bash
sudo pacman -S power-profiles-daemon
sudo systemctl enable --now power-profiles-daemon
```
You can install a manager for your DE, on KDE Plasma:
```bash
sudo pacman -S power-devil
```
then you will be able to change power profiles from your panel/taskbar.


## Manually adjusting charging thresholds

You can manually adjust the charging thresholds if your hardware allows it. As a reference you can check your current values by running
```bash
echo /sys/class/power_supply/BAT0/charge_control_start_threshold
echo /sys/class/power_supply/BAT0/charge_control_end_threshold
```
and create a systemd service that rewrites them on boot

{: .codeblock data-title="/etc/systemd/system/battery.service"}
```
[Unit]
Description=Set battery charge thresholds
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/bin/sh -c "echo 75 > /sys/class/power_supply/BAT0/charge_control_start_threshold"
ExecStart=/bin/sh -c "echo 85 > /sys/class/power_supply/BAT0/charge_control_end_threshold"

[Install]
WantedBy=multi-user.target
```
then simply enable the service
```bash
sudo systemctl enable --now battery.service
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
