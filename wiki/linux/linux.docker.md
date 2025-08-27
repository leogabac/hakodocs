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

Follow their [Docker Install](https://docs.stirlingpdf.com/Installation/Docker%20Install/) guide for more information.

## MATLAB

MATLAB is one of those "programming languages" that you usually use against your will. It can be either very easy or very difficult to install it on Linux, and [their documentation](https://www.mathworks.com/help/install/ug/install-products-with-internet-connection.html) is misleading at best when they never mention all the required dependencies that you always need to look manually in a painfully slow iterative process.

### Browser Image

Turns out there is an [Official MATLAB image](https://hub.docker.com/r/mathworks/matlab) on DockerHub that contrary to their installer, actually works. Here is a basic `compose.yaml` file.

{: .codeblock data-title="compose.yaml"}
```yaml
services:
  matlab:
    image: mathworks/matlab:r2025a
    container_name: matlab-desktop
    ports:
      - "8000:8888"
    volumes:
      - ./matlab-files:/home/matlab/Documents/MATLAB:rw
    command: -browser
    restart: unless-stopped
```
then
```bash
docker compose up
```
This will make MATLAB available on [http://localhost:8000](http://localhost:8000).

{: .tip}
> To run in the background, add the `-d` flag to the `docker-compose` command.

You will need to login to your MathWorks account for license validation.

{: .note}
> Due to the nature of the container, and that I haven't found a solution. You will need to login to your MathWorks account everytime the container is freshly launched.

{: .warning}
> The browser version of the container **does not** plot interactive features. For this, follow the VNC subsection.

### VNC version

If you want a more capable VNV version of the same container, simply make a few modifications to the compose file. We will use the same mounted points so that they can work in combo.

{: .codeblock data-title="compose-vnc.yaml"}
```yaml
services:
  matlab:
    image: mathworks/matlab:r2025a
    container_name: matlab-vnc
    ports:
      - "5901:5901"   # VNC port
      - "6080:6080"   # noVNC browser access
    shm_size: "2g"
    tty: true
    stdin_open: true
    volumes:
      - ./matlab-files:/home/matlab/Documents/MATLAB:rw
    command: -vnc
    restart: unless-stopped
```

{: .tip}
> Allocate more or less resources with the `shm_size` and `cpus` flags.




Launch the container
```bash
docker compose --file=./compose-vnc.yaml up -d
```
You now can access the VNC version at [http://localhost:6080](http://localhost:6080). It will look like XFCE with a MATLAB icon on the desktop.

{: .note}
> The **default password** is `matlab`.

{: .note}
>Optionally, install a VNC Client, I recommend `remmina` as it has proper scaling for HiDPI monitors
>
>```bash
>sudo pacman -S remmina gtk-vnc
>```
>Then connect to `localhost:5901` from remmina.






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
