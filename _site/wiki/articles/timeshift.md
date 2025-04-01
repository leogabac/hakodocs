# Timeshift

Timeshift is a backup and restore tool for Linux that creates system snapshots, allowing users to revert their system to a previous state in case of errors, updates gone wrong, or system corruption. It works similarly to Windows System Restore or macOS Time Machine but focuses on system files rather than personal data. Timeshift supports `rsync` (incremental backups with hard links) and `btrfs` snapshots (for filesystems with built-in snapshot support).

A good practice is to make a system snapshot with `timeshift` before making a full system upgrade. Here I will provide a basic setup to accomplish this, but you can read the [Timeshift Arch Wiki Page](https://wiki.archlinux.org/title/Timeshift) for more information.

Install the package and enable a chosen cron scheduler (`cronie` for this case)
```bash
sudo pacman -S timeshift cronie
sudo systemctl start cronie.service
sudo systemctl enable cronie.service
```

{: .tip}
> Open the Timeshift GUI from your applications menu and make an initial setup by clicking on _Wizard_\
> For ext4 filesystems:
> 1. Choose `rsync`.
> 2. Choose your disk.
> 3. Select daily snapshots and keep from 2-3 of them.
> 4. Click finish

Although you can manipulate Timeshift with a GUI, the _Command Line Interface_ (CLI) helps with automation of snapshops. For example, you can make a bash script that makes a snapshot, and then a full system upgrade
```bash
#!/bin/bash

sudo timeshift --create --comments "update $(date +%y)w$(date +%U)"
sudo pacman -Syu
```

This creates a snapshop with a comment _update ##w##_ that updates with the year and current week, e.g. _25w13_ is Week 13 of 2025.

After the snapshot, it upgrades the system.


