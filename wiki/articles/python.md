---
title: Python
description: Python
---

# Python

Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is widely used in web development, data science, automation, artificial intelligence, and scientific computing due to its extensive libraries and active community.

This article is a basic guide on the common setups one has to deal with in Python.

## Installation

WIP

# Virtual Environments

I use a lot of virtual environments to not break system packages. "Global" environments are stored in `~/.virtualenvs/`.

```bash
sudo pacman -S python-virtualenv
mkdir ~/.virtualenvs/
```

As an example, let's make a virtualenv called `pyglobal`, run

```bash
virtualenv ~/.virtualenvs/pyglobal
source ~/.virtualenvs/global/bin/activate
```

Add an alias to the environment in your `~/.bashrc`

```bash
alias pyglobal="source ~/.virtualenvs/global/bin/activate"
```

## pyenv

More often than not, we need to manage multiple python versions since ArchLinux changes versions more often that I like it. To accomplish this, I make a virtual environment that uses a particular python binary. This binary can either be compiled manually, installed from the AUR, or in this case using pyenv.

Pyenv does a lot of things, but I personally use it as an installer and manager of python versions. Following their [documentation](https://github.com/pyenv/pyenv)
```bash
virtualenv --python=/home/USER/.pyenv/versions/3.12.0/bin/python3.12 /home/USER/.virtualenv/py3.12
```

> __WARNING:__\
> It is really important to give the full path to the python binaries. Otherwise it can throw you a RuntimeError.


