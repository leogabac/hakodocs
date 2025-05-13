---
title: Linux Dump: Laggy suspend
description: Laptop is laggy after suspend
---

# Linux Dump: Laptop is laggy after suspend

This guide started to become very long as I try to solve this problem. Here is basically a log on everything I tried.

# Symptoms

After resuming from suspend, the CPU clock is stuck near the absolute minimum, in my case ~500 MHz affecting general performance.

The issue seems to appear when the laptops is suspended _on low battery_.


# Ultimate solution

Still haven't found anything very specific. Best results come from

- Going back to `acpi-cpufreq` scaling driver.
- Daily-driving the `linux-lts` kernel.
- Using `tlp` for managing battery. See [TLP](linux.dump#TLP) for information on how to install and configure it.
- Suspending on power and decent battery levels when possible.


# The Journey


## Software-level solutions

There are several software-level solutions you can try, such ac
1. Changing power profile.
2. Forcing frequency scaling to performance mode.
3. Change suspend mode. In my case, my laptop only allows `s2idle`. You can see more information on the [Suspend and Hibernate Arch Wiki page](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate).

{: .note}
> Nothing from this worked for me. But it could work for you.

## Firmware-level solutions

If software does not work, then this might be a firmware/BIOS problem.

1. Check for BIOS updates.
2. Disable power-saving features on the BIOS options.

{: .note}
> Nothing from this worked for me. But it could work for you.

## Driver-level solutions

The issue might be driver-related. In particular my laptops uses the `amd-pstate-epp` driver, which has some related-reported issues [on bugzilla](https://bugzilla.kernel.org/show_bug.cgi?id=217931) and [on reddit as well](https://www.reddit.com/r/linuxquestions/comments/z7rk35/really_weird_bug_with_new_amd_pstateepp_v4_driver/).

To figure out your driver, run
```bash
cpupower frequency-info
```
A workaround for this is to change the driver on the boot options from GRUB. There are several options,  and make a new GRUB config file with the command
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg && reboot
```

- To use the regular `amd-pstate` scaling driver

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_CMDLINE_LINUX_DEFAULT="... amd_pstate=disable"
```

{: .note}
> Did not work for me after some days of testing. But I still encourage whoever is reading this to try this approach.

- To use the older `acpi-cpufreq` driver

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_CMDLINE_LINUX_DEFAULT="... initcall_blacklist=amd_pstate_init amd_pstate.enable=0"
```

{: .tip-noheader}
> Best results so far, but still the problem arises from time to time.
> It seems to be that the problem only arises when _on battery power_. Nothing on software seems to fix this, so I believe it is a BIOS/firmware issue. 

## Ignore Processor Power Cap

This seems to fix the problem for some people. Ignoring the Processor Power Cap (PPC).

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_CMDLINE_LINUX_DEFAULT="... processor.ignore_ppc=1"
```

{: .note}
> Did not work for me. But I still encourage whoever is reading this to try this approach.

## Changing to LTS kernel

The LTS kernel might have better and more stable behavior. Did not work for me, but you can still try. Install the kernel by

```bash
sudo pacman -S linux-lts linux-lts-headers
```

Add the following to your GRUB configuration so that it becomes easier to return to the last used kernel.

{: .codeblock data-title="/etc/default/grub"}
```
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

remake the GRUB configuration and reboot.

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg && reboot
```
You will find the kernels under "Advances Options for Arch Linux", but when both kernels are installed, GRUB defaults to the LTS.





