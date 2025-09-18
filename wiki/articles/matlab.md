---
title: "Matlab"
description: "Matlab"
---

# MATLAB

Download the Matlab Package Manager and make executable

```
wget https://www.mathworks.com/mpm/glnxa64/mpm
chmod +x mpm
```

Install matlab
```
./mpm install --release=R2025a --destination=$HOME/matlab MATLAB
```
or with more packages
```
./mpm install --release=R2025a --destination=$HOME/matlab MATLAB Simulink Deep_Learning_Toolbox Parallel_Computing_Toolbox
```

Create a distrobox container
```bash
sudo pacman -S distrobox
distrobox-create --name ubuntu-lts --image ubuntu:24.04 --additional-flags "--device /dev/dri --group-add video"
distrobox enter ubuntu-lts
```

Inside the container, install basic dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y \
    x11-apps xauth \
    libnss3 libasound2t64 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libxcomposite1 libxrandr2 libxss1 libxtst6 libgtk-3-0 libgbm1 \
    libglu1-mesa libxi6 libxrender1 libxinerama1 libsm6 \
    fontconfig fonts-dejavu-core ca-certificates mesa-utils mesa-vulkan-drivers libgl1-mesa-dri
```
Test that everything is working on the XWayland side
```bash
xclock
glxinfo | grep "renderer string"
```

Run the MATLAB authorizer
```bash
$HOME/matlab/bin/glnxa64/MathWorksProductAuthorizer.sh
```
If it opens, you are now on the other side.
```bash
$HOME/matlab/bin/matlab
```
You can make it bigger with the environment variables
```
export QT_SCALE_FACTOR=1.8
export GDK_SCALE=1
export GDK_DPI_SCALE=1
```
Export the app






