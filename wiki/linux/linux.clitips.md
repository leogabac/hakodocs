---
title: "Linux CLI Tips"
description: "Linux CLI Tips"
---

# Linux: CLI Tips

This is a collection of quick commands you can use to accomplish very specific tasks using the command line. This is a continuously growing collection, and contributions are accepted.

See the Table of Contents for a full guide.

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

