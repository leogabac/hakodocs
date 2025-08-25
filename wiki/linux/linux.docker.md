# Docker

## Installation

To run docker, install the docker engine

* **Arch-based systems**
```bash
sudo pacman -S docker docker-compose
```

* **Debian/Ubuntu**

* **REHL/Fedora**

and start/enable the daemon

```bash
sudo systemctl enable --now docker.service
```

# Basic Introduction to Docker

# Cool applications

## Windows Virtual Machine

Unfortunately, you will need Windows at some point and we are sometimes lazy enough to spend 5 hours debugging a _not-decently_ made alternative instead of rebooting into a Windows partition.

Just shove a Windows VM into a docker container and call it when you need it. Or just remove it completely when you get tired of it.

Here is a [tutorial](https://github.com/winapps-org/winapps/blob/main/docs/docker.md) from WinApps on how to set it up using `docker` or `podman`.

## WinApps

WinApps is a way of running Windows applications on Linux. While `wine` uses a translation layer of instructions, `winapps` uses a VM in a docker container and streams specific applications to you DE via Remote Desktop, making it so that you can use a regular Win application as if it were native.

See the [WinApps repository](https://github.com/winapps-org/winapps) for more information.

The obvious downside is that you need enough resources to keep the VM active. The benefit is that you can run basically any Windows application this way.

## Stirling PDF

Although you can run a Stirling PDF server locally without issues. It has _way too many_ dependencies that you might not need in your system. For this case, it is simpler to just shove it in a Docker Container

# Frequently Asked Questions

## How do I run rootless docker?

{: .warning}
>Any action from this could cause unperceived vulnerabilities. Use at your own caution and risk.

Create the `docker` group

```bash
sudo groupadd docker
```

and add your current user (or any user) to the group
```bash
sudo gpasswd -a $USER docker
```
