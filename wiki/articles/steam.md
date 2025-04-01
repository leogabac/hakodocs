---
title: Steam
description: Steam
---

# Steam

You know what steam is already.

## Installation

Follow the [Arch Wiki Steam Page](https://wiki.archlinux.org/title/Steam).

# Breaking Bugs

- **Steam not opening correctly**

  Steam is not opening correctly, it is instead openign _phantom windows_. Issue might be related to which GPU the desktop environment is deciding to use when loading the application. To solve the issue, edit the file `usr/share/applications/steam.desktop`

  Look for the line that contains `PrefersNonDefaultGPU` and set it to false.

  {: .codeblock data-title="usr/share/applications/steam.desktop"}
  ```sh
  PrefersNonDefaultGPU=false
  ```
