---
title: ZeroTier
description: ZeroTier
---

# ZeroTier

ZeroTier is a software-defined networking (SDN) solution that enables secure and decentralized virtual networking. It allows devices to connect as if they were on the same local network, regardless of their physical location. ZeroTier combines the benefits of VPNs and SD-WANs, offering easy setup, high performance, and end-to-end encryption. It is widely used for remote access, IoT, gaming, and private networking without complex firewall or port forwarding configurations.

## Installation

To install ZeroTier, first create an account on [their weibsite](https://www.zerotier.com/), then install the client.

- **Windows/MacOC**

  Download the correct file from their [Downloads Page](https://www.zerotier.com/download/)

- **Linux**

  For any distribution

  ```bash
  curl -s https://install.zerotier.com | sudo bash
  ```

  For **Arch Linux**, install the `zerotier-one` package.

  ```bash
  sudo pacman -S zerotier-one
  ```

  Then enable/start the daemon

  ```bash
  sudo systemctl start zerotier-one.service
  sudo systemctl enable zerotier-one.service
  ```

  To verify your installation run

  ```bash
  sudo zerotier-cli status
  ```

## Usage (Linux Systems)

To Join a network, go to [ZeroTier Central](http://my.zerotier.com/) and create a network. Copy the id and run
```bash
sudo zerotier-cli join ################
```
verity you joined correctly with
```bash
sudo zerotier-cli listnetworks
```
that you have joined correctly. 

Note that to communicate between PCs in the same network you do not use the physical IP of the machine, but the assigned ip by zerotier. To see this, go to the network settings and you will see the joined devices under *Members*. Make sure to give it a name/description to not forget which machine it is. Your IP of interest if under *Managed IPs*
