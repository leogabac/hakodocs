# Inkscape

Inkscape is a free and open-source vector graphics editor known for its powerful tools and user-friendly interface, making it ideal for creating illustrations, diagrams, logos, and complex designs. It uses the Scalable Vector Graphics (SVG) format as its native file type, ensuring resolution-independent output suitable for both print and web. Inkscape supports a wide range of features, including path editing, node manipulation, advanced text handling, layers, filters, and extensions. Compatible with Windows, macOS, and Linux, it is widely used by designers, illustrators, and hobbyists seeking a robust alternative to commercial vector design software.

## Installation
- On Arch Linux, simply
```bash
sudo pacman -S inkscape
```
- On Ubuntu-based systems,
```bash
sudo add-apt-repository ppa:inkscape.dev/stable
sudo apt update
sudo apt install inkscape
```

# Rendering LaTeX

There are many ways to render LaTeX text inside inkscape. An excellent option is the TexText plugin as it allows re-editing your renders and provides a preamble `.tex` file for full customization of your environment. 

To install it (on Linux) 
1. Go to their [releases page](https://github.com/textext/textext/releases) on GitHub and download the corresponding tarball (`.tar.gz`). 
2. Change into the extracted directory
3. Run `python3 setup.py`.
4. Install the `python3-tinycss2` package from your package manager.

{: .warning}
> Make sure to have a LaTeX compiler installed (e.g. `texlive`). You can see the [Hakodocs' LaTeX page](latex) for more information.

