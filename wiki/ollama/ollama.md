---
title: Ollama
description: Ollama
---

# Ollama

Ollama is an application that lets you download and run offline LLMs.

## Installation

Generally for Linux:
```bash 
curl -fsSL https://ollama.com/install.sh | sh
```

For Arch Linux you can install one of three packages
1. `ollama` for CPU Models
2. `ollama-cuda` for NVIDIA GPUs
3. `ollama-rocm` for AMD GPUs

Then start/enable the daemon
```bash
sudo systemctl start ollama.service
sudo systemctl enable ollama.service
```

Or simply run in a command line for quick testing
```bash
ollama serve
```

# Running a model

To run a model, first look in the [Ollama library](https://ollama.com/library) for the model name you want to use. For example
```bash
ollama run deepseek-r1:1.5b
```

This will download, run and start the prompt in a therminal with the LLM.

{: .tip}
> In the model, write `/?` for help and `/bye` to exit.

# AMD GPUs

Ollama has [limited support](https://ollama.com/blog/amd-preview) for AMD discrete GPUs since the ROCm technology only support a few, and very recent models. Nevertheless, it is still possible to offload ollama's processing into unsopported integrated or discrete GPUs by changing the `HSA_OVERRIDE_GFX_VERSION` environment variable when launching ollama. 

First we need to figure out the _GFX_ version that applies to your particular GPU. Extracted from the [Ollama Arch Wiki Page](https://wiki.archlinux.org/title/Ollama), first execute.

```bash
/opt/rocm/bin/rocminfo | grep amdhsa
```
This will query the exact GFX version to your system. It will give you either three of four digits.
- If you have four digits, they are interpreted as `XXYZ`.
- If you have three digits, then `XYZ`

Remember these digits, as your GFX version is either `XX.Y.Z` or `X.Y.Z` depending on whether you got three or four digits.

Then find all of the installed `rocblas` kernels
```bash
find /opt/rocm/lib/rocblas/library -name 'Kernels.so-*'
```
And find the closest to your actual version following these rules
1. For the `X` part, it must be strictly equal to the actual version.
2. For the `Y` part, mismatch is allowed, but it must be no greater than the the actual version.
3. For the `Z` part, mismatch is allowed, but it must be no greater than the the actual version.

As a test, if running, stop the ollama daemon
```bash
sudo systemctl stop ollama.service
```
Execute the following with your GFX version
```bash
HSA_OVERRIDE_GFX_VERSION=X.Y.Z ollama serve
```
and run a model to test if the GPU is now being used. If it is still not being used, follow the same steps to figure out the correct GFX version until you get the right numbers.

Once you made sure which is the correct environment variable, edit the ollama daemon
```bash
sudo systemctl edit --full ollama.service
```
This will open the daemon configuration file, look for the `[Service]` section and add

{: .codeblock data-title="/etc/systemd/system/ollama.service"}
```
[Service]
Environment="HSA_OVERRIDE_GFX_VERSION=X.Y.Z"
ExecStart=/usr/bin/ollama serve
```

Finally, perform a daemon reload
```bash
sudo systemctl daemon-reload
```
and restart the ollama daemon
```bash
sudo systemctl restart ollama.service
```

# See also
- [Ollama: Open WebUI](ollama.openwebui)
