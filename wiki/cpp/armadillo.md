---
title: "C++: Armadillo"
description: "Armadillo"
permalink: /cpp/armadillo/
redirect_from:
  - /cpp.armadillo
---

# C++: Armadillo

Armadillo is a C++ linear algebra library with a MATLAB-like API for vectors, matrices, decompositions, and basic numerical workflows.

## Installation

On Arch Linux:

```bash
sudo pacman -S armadillo
```

On Debian/Ubuntu:

```bash
sudo apt install libarmadillo-dev
```

## Minimal Example

{% raw %}
```cpp
#include <armadillo>
#include <iostream>

int main() {
    arma::mat A = {{1.0, 2.0}, {3.0, 4.0}};
    arma::vec b = {5.0, 11.0};

    arma::vec x = arma::solve(A, b);
    x.print("solution:");
}
```
{% endraw %}

## Compilation

```bash
c++ main.cpp -o main.out -larmadillo
```

{: .tip}
> Armadillo wraps lower-level BLAS/LAPACK functionality, so it is a good choice when you want dense linear algebra in C++ without writing raw solver calls yourself.
