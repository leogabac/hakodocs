---
title: "Linux: Sleep"
description: "Linux: Sleep"
---

# Linux: Sleep

# Common problems

## Laptop is not going to sleep

First, check if there are any errors from the sleep daemon
```bash
systemctl status systemd-suspend.sevice
```
If "device is busy", or "failed to suspend", check if there are any suspend inhibitors active that you may not want
```bash
systemd-inhibit --list
```
Additionally, if you are using an NVIDIA graphics card, make sure the services that manage the card's sleep are enabled. If they are not, then the device cannot be put to sleep and systemd crashes
```bash
sudo systemctl enable nvidia-suspend.service
sudo systemctl enable nvidia-hibernate.service
sudo systemctl enable nvidia-resume.service
```

