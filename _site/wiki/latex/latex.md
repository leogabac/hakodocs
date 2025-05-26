# LaTeX

To work with LaTeX, you need a compiler. In Linux we typically use `texlive`, for more information you can read the [TexLive Arch Wiki Page](https://wiki.archlinux.org/title/TeX_Live) and the [texlive package group](https://archlinux.org/groups/x86_64/texlive/).

A basic setup is obtained by installing the whole group.
```bash
sudo pacman -S texlive
```

From this, your selected LaTeX editor should pick up the `latex` command in PATH.
```bash
latex --version
```

# Neovim LaTeX support

To have LaTeX support in neovim, install the `vimtex` plugin using your preferred plugin manager.

{: .tip}
> Install `zathura` and `zathura-pdf-mupdf` to render your PDF and have additional features.

Additionally, you might want to setup an equivalent for the following:
- An autocompletion engine (e.g. `nvim-cmp`) that connects with `vimtex`.
- A snippet engine (e.g. `LuaSnip`).
- A snippet library (e.g. `friendly-snippets`).

# Spellcheck LSP (Neovim)

{: .warning}
> The spellcheck consumes **a lot** of RAM. You have been warned.

To have an LSP intended for LaTeX that checks spelling and grammar, in neovim you can install the `ltex-ls` LSP through your package manager. If you have `lspconfig` and `mason` installed, you can run
```
:MasonInstall ltex-ls
```
Additionally, you will need a Java runtime
```bash
sudo pacman -S jdk21-openjdk
```

{: .warning}
> Note that `ltex-ls` is **not** compatible with Java 24, hence I suggested `jdk21-openjdk` previously. If you already had a java runtime installed with Java 24, install Java 21 alongside it and run
> ```bash
> sudo archlinux-java set java-21-openjdk
>```

Use your LSP configuration and picker of choice to interact with the diagnostics and fixes.



