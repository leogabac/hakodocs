---
title: Jupyter Notebooks
description: Jupyter Notebooks
---


# Python: Jupyter Notebooks

Jupyter Notebooks are an interactive computing environment that allows users to write and execute code in a web-based interface. They support multiple programming languages (with Python being the most common) and combine code, text, equations, and visualizations in a single document. Jupyter is widely used in data science, scientific computing, and education for prototyping, data analysis, and sharing reproducible research.

## Installation

Jupyter Notebooks are available via the [Python Package Index](https://pypi.org/).
```bash
pip install notebook
```
You can also install the more modern Jupyter Lab, although this guide uses the Classic Notebook package.
```bash
pip install jupyterlab
```
To start a server on `localhost:8000` simply run.
```bash
jupyter notebook
```

{: .note}
> The root directory / is mapped to wherever the jupyter notebook is started.

# Set Up a Remote Server

Using a remote server in Jupyter is essential when working with resource-intensive tasks that require more computing power than a local machine can provide. This is common in data science, machine learning, and scientific computing, where large datasets and complex models demand high-performance CPUs, GPUs, or specialized hardware. Running Jupyter on a remote server allows users to access powerful resources while working from a lightweight local machine, ensuring efficiency and flexibility. Here is a simple, probably not so secure method to set up a quick jupyter server in your remote machine. Taken from [this article](https://lerner.co.il/2017/02/01/five-minute-guide-setting-jupyter-notebook-server/)

Generate a jupyter config file with
```bash
jupyter notebook --generate-config
```
Open the generated file `jupyter_notebook_config.py`. This file is stored in the user's home directory, i.e. these changes apply only to the current user and need to be set up for other users in case you need it. Here we will change a few configuration options.

- Don't start the web browser automatically.
```bash
c.NotebookApp.open_browser = False
```
- Listen on the local network instead of the localhost only.
```bash
c.NotebookApp.ip = '0.0.0.0'
```
- Don't require a password. (For some reason I never got this to work)
```bash
c.NotebookApp.password = ''
```
- Set up a token (This will be the password)
 ```bash
c.NotebookApp.token = 'PASSWWORD'
```
- **Optional**: Change the default port. Useful when you have multiple users on the same PC.
```bash
c.NotebookApp.port = 8888
```

{: .tip}
> In case you have multiple users/students, set up their configuration files with different ports and token passwords.

# Vim Bindings

Basic Vim Bindings can be easily set up using the [jupyter-vim-binding](https://github.com/lambdalisue/jupyter-vim-binding) plugin. Following their documentation, run
```bash
# Create required directory in case (optional)
mkdir -p $(jupyter --data-dir)/nbextensions
# Clone the repository
cd $(jupyter --data-dir)/nbextensions
git clone https://github.com/lambdalisue/jupyter-vim-binding vim_binding
# Activate the extension
jupyter nbextension enable vim_binding/vim_binding
```
