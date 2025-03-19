---
title: C++: FFT
description: FFT
---

# C++: Fast Fourier Transform

The fastest Fourier Transform in the West.

## Installation
Install the _FFTW_ library, on Arch Linux
```bash
sudo pacman -S fftw
```
By installing this, we have access to the header:

```cpp
#include <fftw3.h>
```

## Quick Start

### Computing the FFT
Here is an example of a function that computes the Fourier Transform on a complex vector, and returns a complex vector:

```cpp
#include <vector>
#include <complex>
#include <fftw3.h>

std::vector<std::complex<double>> compute_fft(std::vector<std::complex<double>> &input){
    int N = input.size();
    std::vector<std::complex<double>> output(N);

    fftw_plan plan = fftw_plan_dft_1d(
            N,
            reinterpret_cast<fftw_complex*>(input.data()),
            reinterpret_cast<fftw_complex*>(output.data()),
            FFTW_FORWARD,
            FFTW_ESTIMATE
    );

    fftw_execute(plan);
    fftw_destroy_plan(plan);

    return output;
}
```

### Compilation
Compile your file by linking the FFTW library:

```bash
c++ main.cpp -o main.out -lfftw3 -lm
```

### Visualization
To visualize it, modify your code to write the real and imaginary parts to a file and visualize it with Gnuplot:

```bash
gnuplot
gnuplot> set xlabel "omega"
gnuplot> set ylabel "f(omega)"
gnuplot> plot "out.dat" using 1:2 with lines title "FFTW"
```

If you have multiple columns (e.g., real and imaginary parts), use:

```bash
gnuplot
gnuplot> plot "out.dat" using 1:2 with lines title "real",\
> "out.dat" using 1:3 with lines title "imag"
```
