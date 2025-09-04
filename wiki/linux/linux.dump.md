---
title: "Linux: Dump"
description: "Some troubleshooting and guides."
---


# Linux: Dump
This is a list of random problems I have had to solve at some point.

# General guides

## TLP

Install packages
```bash
sudo pacman -S tlp tlp-rdw acpi_call ethtool smartmontools
```
and enable/start services
```bash
sudo systemctl enable --now tlp.service
sudo systemctl enable --now NetworkManager-dispatcher.service
sudo systemctl mask systemd-rfkill.service
sudo systemctl mask systemd-rfkill.socket
```
then we need to edit a configuration under `/etc/tlp.conf`. It already has sensible defaults, but the file has all the information you need. For reference, here are all the parameters I changed.


{: .codeblock data-title="/etc/tlp.conf"}
```
CPU_SCALING_GOVERNOR_ON_AC=performance
CPU_SCALING_GOVERNOR_ON_BAT=powersave

CPU_ENERGY_PERF_POLICY_ON_AC=performance

PLATFORM_PROFILE_ON_AC=balanced
PLATFORM_PROFILE_ON_BAT=low-power

START_CHARGE_THRESH_BAT0=75
STOP_CHARGE_THRESH_BAT0=80
```

## Migrating `wpa_supplicant` to `iwd`

The Intel Wireless Daemon is a modern alternative to `wpa_supplicant` with
1. Faster reconnections
2. Simple and more efficient
3. Better security
4. Drop-in replacement for NetworkManager

To change to it install the `iwd` package
```bash
sudo pacman -S iwd
```
Stop and disable `wpa_supplicant`
```bash
sudo systemctl stop wpa_supplicant
sudo systemctl disable wpa_supplicant
```
Also mask it to never restart automatically
```bash
sudo systemctl mask wpa_supplicant
```
Enable and start `iwd`
```bash
sudo systemctl enable --now iwd
```
Configure NetworkManager by creating or modifying the file

{: .codeblock data-title="/etc/NetworkManager/conf.d/wifi-backend.conf"}
```bash
[device]
wifi.backend=iwd
```
and restart
```bash
sudo systemctl restart NetworkManager
```
You will be asked again for Network authentication.

### Connecting `iwd` to EAP-PEAP networks

Universities and Organizations have some tricky networks that cannot be configured using `iwctl` directly, and need to be done manually. For this you need to create a file called `essid.8021x` under `/var/lib/iwd/essid.8021x`, where `essid` is the network name. The file structure is as follows, and you only need to fill in the spaces.

{: .codeblock data-title="/var/lib/iwd/essid.8021x"}
```
[Security]
EAP-Method=PEAP
EAP-Identity=anonymous@realm.edu
EAP-PEAP-CACert=/path/to/root.crt
EAP-PEAP-ServerDomainMask=radius.realm.edu
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=johndoe@realm.edu
EAP-PEAP-Phase2-Password=hunter2

[Settings]
AutoConnect=true
```

For example, at _Tec_ you need something like. If you are at this institution, you should know how to fill-in the information.

{: .codeblock data-title="/var/lib/iwd/Tec.8021x"}
```
[Security]
EAP-Method=PEAP
EAP-Identity=a0xxxxxxx
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=a0xxxxxxx
EAP-PEAP-Phase2-Password=your_passwd

[Settings]
AutoConnect=true
```
NetworkManager will connect automatically to the network.

# Troubleshooting Dump

## Laptop is _laggy_ after suspend

See [Laptop is laggy after suspend](linux.dump.laggy_suspend) for more information.


## 


