---
title: "Linux CLI Tips"
description: "Linux CLI Tips"
---

# Linux: CLI Tips

This is a collection of quick commands you can use to accomplish very specific tasks using the command line. This is a continuously growing collection, and contributions are accepted.

See the Table of Contents for a full guide.

# Remote connections

## Simple `ssh` connection
To connect to some `user` at remote server that has some `ip` at the default port (port 22)
```bash
ssh user@ip
```
If successful, it will prompt for a password. For custom ports use the `-p` flag.

## Mounting remote filesystem

The _seamless_ way to access directories from a remote computer, like a server or cluster you need to constantly use is by mounting the remote directory into your filesystem. To do this, you will need `sshfs`. On Linux install it via you package manager, on macOS you will need to follow [this tutorial](https://medium.com/@airdipu/use-sshfs-to-mount-drive-in-macos-using-macfuse-563be8eac634), and on Windows, figure it out yourself.

For Arch-based systems
```bash
sudo pacman -S sshfs
```

Then make some directory where you want to mount the filesystem, as an example
```bash
mkdir -p $HOME/remote-mnt/host
```
then simply
```bash
sshfs user@host:path/in/host/machine $HOME/remote-mnt/host
```
If successful it will prompt for your password, and your file manager like `dolphin` or `nautilus` should detect it immediately.


# Useful and unorganized bash functions

## Add git branch to `PS1` prompt

The following bash function writes adds `(branch)` at the end of your default prompt.
```
git_branch() {
  git branch 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
```

# Images

## Merge images to PDF

Depends on 'imagemagick'.
```bash
convert $(ls -v *.jpg) out.pdf
```

## Merge images to video
Combine images (frames) into a single video. Depends on 'ffmpeg'
```bash
ffmpeg -framerate 30 -i %d.png -c:v libx264 -pix_fmt yuv420p output.mp4
```
in case it fails, you can try instead
```bash
ffmpeg -framerate 15 -i %d.png -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p output.mp4
```

# Video

## Convert format
Depends on 'ffmpeg'.
```
ffmpeg -i video.mkv -codec copy video_out.mp4
```

