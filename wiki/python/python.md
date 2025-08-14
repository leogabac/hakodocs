---
title: Python
description: Python
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
pip install --user
```

Let us create a virtual environment for general usage under the directory `~/.virtualenvs/`. First install the system package `python-virtualenv`

```bash
sudo pacman -S python-virtualenv
mkdir ~/.virtualenvs/
```

As an example, let's make a virtualenv called `pyglobal` and activate it via the `source` command.

```bash
virtualenv ~/.virtualenvs/pyglobal
source ~/.virtualenvs/global/bin/activate
```

For easier access, add an alias to your `~/.bashrc`.

```bash
alias pyglobal="source ~/.virtualenvs/global/bin/activate"
```

To exit any virtual environment, at any time run the command `deactivate`.

## Python's built-in `venv` module

Python has its own tool for creating virtual environments. This is very helpful whenever you are accessing a server and don't have access to `virtualenv`, but you still have some access to some python binaries.

For example, in one of the High Performance Computing (HPC) servers I have access, there are multiple python versions callable by e.g. `python3.12` or `python3.8`, but we don't have access to `virtualenv`. Thus I need to manage virtual environments either with `conda` or `venv`. To do this, call the the python binary you are interested in, followed by the module flag `-m venv`

```
python3.12 -m venv .venv
```

# Managing Versions

Different projects may require different Python versions due to compatibility with specific libraries, dependencies, or system requirements. For example, an older project might rely on Python 3.7 because some of its dependencies have not been updated for newer versions, while a new project could require Python 3.11 to take advantage of performance improvements and new language features. Additionally, some systems or frameworks may only support certain Python versions, making it necessary to switch between them. Tools like [pyenv](https://github.com/pyenv/pyenv) or [conda](https://docs.conda.io/projects/conda/en/stable/index.html) allow users to manage multiple Python versions efficiently, ensuring that each project runs in a controlled and compatible environment.

{: .tip}
>For rolling-releases, it is better to use virtual environments that do not point to the global python version. When the global python is updated, your virtualenv might break.

Pyenv is a tool, that among other things, it serves as an automation tool for compiling python versions from source and have them under the user's home directory `~/.pyenv/`. For installation follow their [documentation](https://github.com/pyenv/pyenv). 

Once a python version is installed, we can let `virtualenv` point to those binaries. As an example, here we installed Python 3.12.0 and created a virtual environment called `py3.12` under the `~/.virtualenvs/` directory.
```bash
virtualenv --python=/home/USER/.pyenv/versions/3.12.0/bin/python3.12 /home/USER/.virtualenv/py3.12
```

{: .warning}
>It is really important to give the full path to the python binaries. Otherwise it can throw you a RuntimeError.


# See also

- [Jupyter Notebook](python.jupyter)
