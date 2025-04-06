# LaTeX

To work with LaTeX, you need a compiler. In Linux we typically use `texlive`, for more information you can read the [TexLive Arch Wiki Page](https://wiki.archlinux.org/title/TeX_Live) and the [texlive package group](https://archlinux.org/groups/x86_64/texlive/).

A basic setup is obtained by installing the whole group.
```bash
sudo pacman -S texlive
```
From this, your selected LaTeX editor should pickup the `latex` command in PATH.

{: .precode}
```sh
latex --version
```
