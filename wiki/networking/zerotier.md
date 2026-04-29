---
title: "ZeroTier"
description: "ZeroTier"
permalink: /networking/zerotier/
redirect_from:
  - /zerotier
---

# ZeroTier

ZeroTier is a software-defined networking (SDN) solution that enables secure and decentralized virtual networking. It allows devices to connect as if they were on the same local network, regardless of their physical location. ZeroTier combines the benefits of VPNs and SD-WANs, offering easy setup, high performance, and end-to-end encryption. It is widely used for remote access, IoT, gaming, and private networking without complex firewall or port forwarding configurations.

## Installation

To install ZeroTier, first create an account on [their website](https://www.zerotier.com/), then install the client.

- **Windows/macOS**

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

To join a network, go to [ZeroTier Central](http://my.zerotier.com/) and create a network. Copy the network ID and run:
```bash
sudo zerotier-cli join ################
```
Verify that you joined correctly with:
```bash
sudo zerotier-cli listnetworks
```
That should show the joined network.

To communicate between PCs in the same ZeroTier network, do not use the physical LAN IP of the machine. Use the IP assigned by ZeroTier instead. In ZeroTier Central, look under *Members* and then *Managed IPs*. Give each machine a readable name so you do not forget what it is.
