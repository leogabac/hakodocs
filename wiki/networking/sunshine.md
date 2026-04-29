---
title: "Sunshine / Moonlight"
description: "Remote Desktop"
permalink: /networking/sunshine/
redirect_from:
  - /sunshine
---

# Sunshine

[Sunshine](https://github.com/LizardByte/Sunshine) is a self-hosted game streaming host for Moonlight. It offers low-latency remote streaming with hardware encoding support for AMD, Intel, and NVIDIA GPUs. Software encoding is also available. You can connect to Sunshine from Moonlight clients on a variety of devices. A web UI is provided for configuration and pairing.

To access the desktop or an application of a remote PC (host), you need:
1. Set up `sunshine` on the host.
2. Download `moonlight` on the client, and connect to the host.

# Quick setup

## Sunshine Setup (Host)

{: .note}
> This is an installation guide for Arch Linux systems. For other systems and more detailed instructions, read the [Sunshine documentation](https://docs.lizardbyte.dev/projects/sunshine/latest/index.html).

{: .tip}
> For the initial setup, everything becomes easier if you have physical access to the host.

### Installation

On Arch Linux, the developers explicitly state that they do not provide support for AUR packages, but they do provide prebuilt binaries via their custom pacman repository. Add the following to `/etc/pacman.conf`:

{: .codeblock data-title='/etc/pacman.conf'}
```sh
[lizardbyte]
SigLevel = Optional
Server = https://github.com/LizardByte/pacman-repo/releases/latest/download
```
Then update the repository, and install `sunshine`
```sh
sudo pacman -Sy
pacman -S sunshine
```

### Initial Setup

After installation, some post-install steps are required:

```sh 
sudo setcap cap_sys_admin+p $(readlink -f $(which sunshine))
```
For **X11 capture**, you may need to disable the capabilities set for KMS capture:

```sh 
sudo setcap -r $(readlink -f $(which sunshine))
```

At this stage you should be able to open a server by running
```sh 
sunshine
```
Preferably, start the daemon
```sh
systemctl --user start sunshine
```
and optionally enable it on startup.
```sh
# OPTIONAL
systemctl --user enable sunshine
```

Sunshine is configured via the Web UI, which is available on [https://localhost:47990](https://localhost:47990).

{: .note}
> You can ignore the browser's message of "insecure website".

On a first setup, you will be prompted to create a _local_ account for managing sunshine. Make sure to remember your username and password, since this is _self hosted_ once gone, they are gone forever.

{: .tip}
> At this stage, you can already share your host's desktop. For more information on how to add applications [read the docs](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2getting__started.html)

## Moonlight (Client)

{: .warning}
> When first setting up a client, you will need access to the Web UI. It is simpler if you have physical access to the host during this process.

### Installation

You can install the `moonlight-qt` AUR package
```sh 
yay -S moonlight-qt
```
or install their official flatpak
```sh 
flatpak install flathub com.moonlight_stream.Moonlight
```
When launching the application, it will automatically look for Sunshine servers on the local network. If your host is not on the local network and has a reachable IP address, you can add it manually from the top-right corner. A typical pairing flow looks like this:

1. Select or add manually the host by providing the correct IP address.
2. Moonlight will give you a PIN, take note of it.
3. Go to your host's Web UI, and click the _PIN_ button located on the top bar.
4. Provide the PIN the client gave you.

Once the client is paired, you should be able to access the host through the Moonlight application.


