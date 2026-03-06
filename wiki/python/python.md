---
title: "Python"
description: "Python"
---

# Python

Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is widely used in web development, data science, automation, artificial intelligence, and scientific computing due to its extensive libraries and active community.

This article is a basic guide on the common setups one has to deal with in Python.

## Installation

**Linux/UNIX**

Your system should already has a global Python version available. Run 
```bash
python3 --version
```
to verify the version. The global python version should update itself with the package manager.

You can install other versions by compiling from source. Visit the [Python Source Download Page](https://www.python.org/downloads/source/) for more information. Make sure to install in your system the [necessary build dependencies](https://devguide.python.org/getting-started/setup-building/#build-dependencies).

On Arch Linux:
```bash
pacman -S --needed base-devel openssl zlib xz tk
```

**Windows**

Go to the [Python Downloads Page](https://www.python.org/downloads/windows/) and get the executable for the version you are interested it. Open the executable and follow the installation wizard. Don't forget to check the _Add Python to PATH_.


# Virtual Environments

A virtual environment in Python is an isolated workspace that allows you to manage dependencies separately for different projects. It prevents conflicts between packages by creating a self-contained directory with its own Python interpreter and libraries. Python >3.11 prevents users from installing packages globally via `pip` and are encouraged to  to use virtual environments or user installs
```bash
pip install --user <package>
```

For better or for worse, there are several ways to create a virtual environment, the following sections will give an overview on the ones I (the main maintainer) have used in the past.

## The `venv` module


Python, has a built-in [`venv`](https://docs.python.org/3/library/venv.html){:.doc-link} module for creating virtual environments. It is slow and limited, but if you don't have access to fancy tools in a server that is not yours, then it can come in handy to know it exists.

```bash
python -m venv <path/to/vritual/environment>
```

For example, in one of the High Performance Computing (HPC) servers I have access, there are multiple python versions callable by e.g. `python3.12` or `python3.8`, but we don't have access to `virtualenv`. Thus I need to manage virtual environments either with `conda` or `venv`. To do this, call the the python binary you are interested in, followed by the module flag `-m venv`

```bash
python3.12 -m venv .venv
```

{: .tip}
>To activate any virtual environment, you need to `source` the `activate` binary, e.g.
>```sh
>source .venv/bin/activate
>```
>If using the `fish` shell, then use the `activate.fish` binary.

{: .tip}
>To exit any virtual environment, at any time run the command `deactivate`.


## The `virtualenv` tool

Let us create a virtual environment for general usage under the directory `~/.virtualenvs/`. First install the system package `python-virtualenv`

```bash
sudo pacman -S python-virtualenv
mkdir ~/.virtualenvs/
```

As an example, let's make a virtualenv called `pyglobal` and activate it via the `source` command.

```bash
virtualenv .venv
source ~/.venv/bin/activate
```

## Conda

Conda, either from Anaconda or Miniconda is arguably one of the most popular tools for creating virtual environments of managing versions (particularly among  developers on MacOS).

To create a virtual environment, run
```
conda create -n <environment name> python=<version>
```

Note that we do not need to provide a path for the environment, as conda typically stores then in some sort of "global" location, typically under `~/.conda`.


# Managing Versions

Different projects may require different Python versions due to compatibility with specific libraries, dependencies, or system requirements. For example, an older project might rely on `python 3.7` because some of its dependencies have not been updated for newer versions, while a new project could require `python 3.11` to take advantage of performance improvements and new language features. 

Additionally, some systems or frameworks may only support certain Python versions, making it necessary to switch between them. Tools like [pyenv](https://github.com/pyenv/pyenv){:data-sup="gh"} or [conda](https://docs.conda.io/projects/conda/en/stable/index.html){:.doc-link} allow users to manage multiple Python versions efficiently, ensuring that each project runs in a controlled and compatible environment.

{: .tip}
>For rolling-releases, it is better to **always** use virtual environments that do not point to the global python version. When the global python is updated, your virtualenv might break.

## The `pyenv` tool

Pyenv is a tool, that among other things, it serves as an automation tool for compiling python versions from source and have them under the user's home directory `~/.pyenv/`. For specific installation follow their [installation guide](https://github.com/pyenv/pyenv){:.doc-link}, for Arch-based distributions you can find it on the `extra` repository, thus

```sh
sudo pacman -S pyenv
```

After you [set up your shell](https://github.com/pyenv/pyenv?tab=readme-ov-file#b-set-up-your-shell-environment-for-pyenv){:.doc-link}, and [install the python build dependencies](https://github.com/pyenv/pyenv/wiki#suggested-build-environment), you can install a python version with

```language
pyenv install <x.y.z>
```
where `<x.y.z>` is some python version e.g. `3.12.0`. This command will compile and install the binaries under the local directory `$HOME/.pyenv/versions/<x.y.z>/`.

Once a python version is installed, we can let e.g. `virtualenv` point to those binaries.

```bash
virtualenv --python=$HOME/.pyenv/versions/<x.y.z>/bin/python<x.y> /path/to/venv
```

or if `virtualenv` is not available, you can directly call the `venv` module from the installed python binaries.

## Conda

When `conda` is available, then it becomes really simple to choose a python version and create a virtual environment

```
conda create -n <environment name> python=<version>
```

# See also

- [Python: Jupyter Lab](python.jupyter)
- [Python: Creating Modules](python.create_module)
