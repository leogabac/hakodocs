---
title: "KDE Connect"
description: "KDE Connect"
---

# KDE Connect

KDE Connect is an open-source application that connects your phone with your computer the same way Apple users like to brag about. It offers a range of features that enhance cross-platform interaction. With KDE Connect, you can sync notifications, share files, control media, use your phone as a remote mouse and keyboard, and even reply to messages directly from your desktop.

## Firewall

If you set up firewall rules, or were already set up by your distribution, you will need KDE Connect to work along with them. Information provided by user [vawaver](https://discuss.cachyos.org/t/kdeconnect-not-connecting/2359/15) in the CachyOS forums.

### Using UFW

To allow the necessary TCP ports, run the following
```bash
sudo ufw allow 1714:1764/tcp
```

To allow the necessary UDP ports, run the following
```bash
sudo ufw allow 1714:1764/udp
```

Then reload
```bash
sudo ufw reload
```

### Using Firewalld

To allow the necessary TCP ports, run the following
```bash
sudo firewall-cmd --zone=public --add-port=1714-1764/tcp --permanent
```

To allow the necessary UDP ports, run the following
```bash
sudo firewall-cmd --zone=public --add-port=1714-1764/udp --permanent
```

Then reload
```bash
sudo firewall-cmd --reload
```





