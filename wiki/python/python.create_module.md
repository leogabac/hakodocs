---
title: "Python: Creating Modules"
description: "Python: Creating Modules"
---

# Python: Creating Modules

When your collection of helper functions, simulation utilities, plotting scripts, and half‑forgotten experimental snippets starts ballooning into a maze of files like `utils_new_final_v3_reallyfinal.py`, and you keep gluing paths together with `sys.path.append(...)`, that’s usually a sign: **it’s time to turn your growing toolbox into a proper Python module**.

This is not overkill (even for small research projects). A clean module structure makes your work reproducible, easier to share, and much easier to maintain as your simulations, datasets, and ideas evolve. In theoretical or computational sciences, where one often runs several experiments in parallel with slightly different parameters, this separation between *core tools* and *experiment code* becomes easier to maintain in the long run.

This guide will demystify the structure of a Python module and help you build your own from scratch.

## The project structure

A minimal, clean Python module layout looks like this:

```
myproject/
├── pyproject.toml
├── README.md
└── src/
    └── myproject/
        ├── __init__.py
        ├── core.py
        ├── context.py
        ├── io.py
        └── physics/
            ├── __init__.py
            ├── core.py
            └── potentials.py
```

This example has a module called `myproject` with one submodule `myproject.physics` each one with several scripts.

There are two main parts to this:

* **Inside `myproject/src`**

    Everything that is part of your module goes inside this directory:

    - The `__init__.py` file
    - Scripts
    - Submodules

* **Outside `myproject/src`**

    Here you write files that are intended for documentation, automation and package managers, e.g.

    - The `pyproject.toml` file, which contains module information, requirements, python version, and declares possible CLI scripts. The `pip` tool uses it for installation.
    - `README.md` for brief documentation, instructions and to have it nicely visualized on Github

    This structure scales well whether your project has 3 files or 300.

## The `pyproject.toml`

The `pyproject.toml` is the modern configuration file for Python packages. It tells package managers how to build and install your module.

A minimal working example:

```toml
[project]
name = "myproject"
version = "0.1.0"
description = "Tools for my physics simulations"
readme = "README.md"
authors = [ { name = "Your Name" } ]
license = { text = "MIT" }
requires-python = ">=3.10"
dependencies = [
    "numpy",
    "scipy",
]

[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"
```

Here, what is important to point out are the following

* `name` is the module’s name used during installation (`pip install -e .`).
* `dependencies` lists what your module needs to run.
* `build-system` tells installers how to build the project (using modern setuptools).

### Optional (but recommended)

* Versioning tools (`setuptools_scm`)
* Optional dependency groups (`[project.optional-dependencies]`)
* Entry points (for command line tools)

---

## The `\_\_init\_\_.py`

Every directory that should behave as a Python package needs an `__init__.py`.

Its roles:

### 1. Mark the directory as a module

Without this file, Python won’t import it.

### 2. Control the public API

Example:

```python
# src/myproject/__init__.py
from .core import simulate, Particle
from .io import load_data

__all__ = ["simulate", "Particle", "load_data"]
```

This tells users:

```python
from myproject import simulate
```

which objects you consider “public”.

### 3. Handle package-level metadata

```python
__version__ = "0.1.0"
```

If using `setuptools_scm`, this can be auto-generated.

### 4. Provide convenience imports

You can re-export subpackages so users can write:

```python
import myproject.physics as phys
```

---

If you want, I can expand the guide with:

* Packaging and distributing your module
* Using `pip install -e .` for editable development
* Structuring modules for scientific computing
* Adding configuration systems (YAML, dataclasses, Hydra, etc.)
* Best practices for naming, API stability, testing, and documentation

Just tell me what to add next.
