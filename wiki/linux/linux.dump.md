---
title: Linux: Dump
description: Some troubleshooting and guides.
---


# Linux: Dump
This is a list of random problems I have had to solve at some point.

# General guides

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

# Troubleshooting Dump
## Laptop is _laggy_ after suspend

This could be one of several issues. 

- **Symptoms**

In particular after resuming from suspend, the CPU clock is stuck near the absolute minimum around 500 MHz affecting general performance. Everything loads slower.

- **Software-level solutions**

I tried software-level solutions like
1. Changing power profile.
2. Forcing frequency scaling to performance mode.
3. Could not change suspend mode as my laptop only allows `s2idle` mode. You can see more information on the [Suspend and Hibernate Arch Wiki page](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate).
4. Changing CPU and powersaving features in the BIOS.

Nothing from this worked. But it could work for you.

- **Driver-level solutions**

If software does not work, then it can only be a firmware/driver issue. First check which scaling driver you are using
```bash
cpupower frequency-info
```
I identified my scaling driver to be `amd-pstate-epp` which has reported issues regarding this specific problem [on bugzilla](https://bugzilla.kernel.org/show_bug.cgi?id=217931) and [on reddit as well](https://www.reddit.com/r/linuxquestions/comments/z7rk35/really_weird_bug_with_new_amd_pstateepp_v4_driver/).

A workaround for this is to change the driver on the boot options from GRUB. There are several options, my first approach was to change it to regular `amd-pstate`

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_CMDLINE_LINUX_DEFAULT="... amd_pstate=disable"
```
update grub and reboot
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg && reboot
```
which also **did not work** for me after some days of testing. But still I encourage whoever is reading this to try this approach.

Finally, my last attempt, which seems to work by now is to change to the `acpi-cpufreq` driver by editing grub again.

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_CMDLINE_LINUX_DEFAULT="initcall_blacklist=amd_pstate_init amd_pstate.enable=0"
```
update grub and reboot
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg && reboot
```
