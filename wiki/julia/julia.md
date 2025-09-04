---
title: "Julia"
description: "Julia"
---

# Julia

Julia is a high-level, high-performance programming language designed for numerical computing and scientific applications. It combines the ease of use of languages like Python with the speed of compiled languages like C. Julia features just-in-time (JIT) compilation, making it highly efficient for mathematical operations, data analysis, and machine learning. It supports multiple dispatch, parallel computing, and seamless integration with Python, C, and Fortran.

## Installation

For specific installation instructions, see the [Julia Downloads Page](https://julialang.org/downloads/). Generic installs can be done via
```bash
curl -fsSL https://install.julialang.org | sh
```
according to their [manual](https://docs.julialang.org/en/v1/manual/installation/).

**Arch Linux**

According to the [Julia Arch Wiki Page](https://wiki.archlinux.org/title/Julia) we can install `juliaup`, the Julia version manager, from the AUR
```bash
yay -S juliaup
```

After the installation, run
```bash
julia
```
This will install the latest julia version available in `juliaup`. It is not necessary to add to PATH.

# Breaking Bugs

Here is a list on workarounds for known bugs.

- **Stack Shared Object**

As of Feb 23 2025, there is a problem that throws the following error when installing from `juliaup` from the AUR.

```
Installing Julia 1.11.3+0.x64.linux.gnu
ERROR: Unable to load dependent library /home/frieren/.julia/juliaup/julia-1.11.3+0.x64.linux.gnu/bin/../lib/julia/libopenlibm.so
Message:/home/frieren/.julia/juliaup/julia-1.11.3+0.x64.linux.gnu/bin/../lib/julia/libopenlibm.so: cannot enable executable stack as shared object requires: Invalid argument
```

This was first posted in the [discourse](https://discourse.julialang.org/t/error-cannot-enable-executable-stack-when-starting-julia-solved/125655) and then generated an [issue](https://github.com/JuliaLang/julia/issues/57250) on the Julia repo.

To solve temporarily this problem, install
```bash
yay -S execstack
```
and run
```bash
execstack -c ~/.julia/juliaup/julia-1.11.3+0.x64.linux.gnu/lib/julia/libopenlibm.so
```

# See also

