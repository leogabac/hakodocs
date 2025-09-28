---
title: "Neovim Setup Guide"
description: "Neovim Setup Guide"
---

# A Step-by-Step Guide for a Decent Neovim Configuration

Welcome to Neovim! There are many ways you might have ended up on this path. Maybe you watched a big content creator like [The Primeagen](https://www.youtube.com/c/theprimeagen), or perhaps you know a bunch of nerdy students who won’t stop talking about a text editor. Whatever the reason, you got curious and landed here.

By default, Neovim is a minimal text editor with a powerful set of keybindings. However, there are useful features you’ll probably want—like a _tabline_ or a _file tree_. That’s where the true power of Neovim comes into play: you can _really_ do whatever you want with it and tailor it to your liking. But it takes time to learn, and the information is scattered across the internet. That’s what this guide is here for.

This is a _written_ guide to walk you step by step through setting up a minimal but decent Neovim configuration. Each section covers a few fundamentals.


# The Structure of a Configuration

Neovim is configured using the [Lua programming language](https://www.lua.org) by writing code into the file `~/.config/nvim/init.lua`. You can put your entire configuration in a single file, but this is discouraged because it can quickly become messy and unorganized.  

In this guide, we’ll build the configuration step by step. Start by creating the directory `~/.config/nvim` with the following structure:

```
nvim
├── init.lua
└── lua/
    ├── core/
    └── plugins/
```

- The `init.lua` script runs each time `nvim` starts. Here we’ll write the code that (1) loads all modules in the `lua/` directory, and (2) initializes important options and configurations.
- Inside the `lua` directory, we’ll keep Lua scripts (called _modules_) that return _Lua tables_ with configuration options.
- For organization, we’ll put all _plugins_ inside `lua/plugins` and all global options inside `lua/core`.


# Core Modules

This section covers how to set up the core modules:

1. Global Vim options  
2. Keymaps  


## Vim Options

There are a few global options we need to set up first to make the editor more comfortable. For example:

1. Show line numbers  
2. Enable _relative_ line numbers  
3. Configure tab spacing  

Paste the following into `lua/core/options.lua`:

{: .codeblock data-title="lua/core/options.lua"}
```lua
vim.wo.number = true -- show line numbers
vim.o.relativenumber = true -- show relative line numbers
vim.o.clipboard = "unnamedplus" -- sync clipboard between OS and Neovim
vim.o.tabstop = 4 -- insert 4 spaces for a tab
```

These won’t take effect until `init.lua` loads the module. Add the following to your init.lua:

{: .codeblock data-title="init.lua"}
```lua
require("core.options") -- ./core/options.lua
```
Then start `nvim`. You will see line numbers. 


{: .tip}
>[Here](https://github.com/leogabac/hakovim/blob/main/lua/core/options.lua) is a list of recommended options. Check them one by one and add whatever feels right


## Keymaps
Keymaps are among the most important things to learn in Vim. Pretty much anything is possible, but let’s start by setting up your leader key. This is a key (usually the space bar) you press first to start a keymap.

Create the file `lua/core/keymaps.lua` and add:

{: .codeblock data-title="lua/core/keymaps.lua"}
```lua
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- disable the spacebar key's default behavior in Normal and Visual modes
vim.keymap.set({ "n", "v" }, "<Space>", "<Nop>", { silent = true })
```

and load the module in your `init.lua`.

{: .codeblock data-title="init.lua"}
```lua
require("core.keymaps") -- ./core/options.lua
```
Now the `<Space>` key acts as your `<leader>` key. For example, to manage buffers, you can add:

{: .codeblock data-title="lua/core/keymaps.lua"}
```lua
vim.keymap.set("n", "<S-l>", ":bnext<CR>", { desc = "Next buffer", unpack(opts) })
vim.keymap.set("n", "<S-h>", ":bprevious<CR>", { desc = "Previous buffer", unpack(opts) })
vim.keymap.set("n", "<leader>bd", ":bdelete!<CR>", { desc = "[B]uffer [D]elete", unpack(opts) })
vim.keymap.set("n", "<leader>bn", "<cmd> enew <CR>", { desc = "[B]uffer [N]ew", unpack(opts) }) -- new buffer
```

Here `<S-l>` means pressing `<Shift>` + `l`, while `<leader>bd` means pressing the leader key (space) followed by `b` and `d` to delete a buffer. These mappings make it easy to move between and manage buffers.full list of recommended keymaps.

{: .tip}
> Check [this file](https://github.com/leogabac/hakovim/blob/main/lua/core/keymaps.lua) for a full list of recommended keymaps.

# Basic Plugins

## Plugin Manager

Neovim is _very_ customizable by writing lua scripts that interact with the API, however most people do not have the time to implement each and every feature by themselves, thus we turn to installing _plugins_. One of the most popular _plugin managers_ out there is [lazy.nvim](https://github.com/folke/lazy.nvim), to install it, include the following in your `init.lua` file and restart `nvim`.

{: .codeblock data-title="init.lua"}
```lua
-- install lazy plugin manager
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    error("Error cloning lazy.nvim:\n" .. out)
  end
end ---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({})
```
 You will notice it takes a bit longer to load, it is normal since it just installed the plugin manager. You can verify everything works by running the `:Lazy` command and seeing the main UI for the plugin manager.

To install plugins you need to pass to the setup function a lua table with all the plugins information. Let's practice by installing a colorscheme.

## Colorscheme

After installing the `lazy.nvim` plugin manager, let us now install our first plugin: a colorscheme. You will be able to find many on the internet, but we will use the [catpuccin](https://github.com/catppuccin/nvim) colors like a _normie_ developer.

Create a new file `lua/plugins/colorscheme.lua` that returns the following lua table

{: .codeblock data-title="lua/plugins/colorscheme.lua"}
```lua
return {
    "catppuccin/nvim", 
    name = "catppuccin", 
    priority = 1000,
    config = function()
        vim.cmd("colorscheme catppuccin")
    end,
}
```

Here `config` is a function that `lazy` executes once whenever the plugin is loaded. In this case the only thing that it is doing is setting the color in the vim API. After this, pass it to the `lazy.nvim` setup and restart `nvim`.

{: .codeblock data-title="init.lua"}
```lua
require("lazy").setup({
    require("plugins.colorscheme"),
})
```

## Filetree

One feature that we are missing is a _file tree_. Although some people do not like to have it, in my opinion it is still useful to have it available for whenever you are exploring the structure of a project you don't know.

For this tutorial, we will use `nvim-tree.lua`(https://github.com/nvim-tree/nvim-tree.lua). To add it, create the file `lua/plugins/nvim-tree.lua`

{: .codeblock data-title="lua/plugins/nvim-tree.lua"}
```lua
return {
  "nvim-tree/nvim-tree.lua",
  version = "*",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  config = function()
    vim.g.loaded_netrw = 1
    vim.g.loaded_netrwPlugin = 1

    require("nvim-tree").setup({
      view = {
        width = 35,
        side = "left",
      },
      renderer = {
        icons = {
          glyphs = {
            folder = {
              arrow_closed = "▶",
              arrow_open = "▼",
            },
          },
        },
      },
      filters = {
        dotfiles = false,
      },
      actions = {
        open_file = {
          quit_on_open = true,
        },
      },
    })

    vim.keymap.set("n", "<leader>e", ":NvimTreeToggle<CR>", { silent = true })
  end,
}
```
Then add it to your `init.lua` file

{: .codeblock data-title="init.lua"}
```lua
require("lazy").setup({
    require("plugins.colorscheme"),
    require("plugins.nvim-tree"),
})
```

When you restart `nvim`, lazy will install the two plugins that we added, and now you will be able to toggle the filetree with `<leader>e` as we set it up.

{: .tip}
>Check the setup function line by line and modify all of the values as you see fit.

## Picker (Fuzzy finder)

A _picker_ is a plugin that opens a menu with a list of items that you can pick from. A common feature all of them implement is the ability to _fuzzy find_ between those items, e.g. if the picker lists all of the files of your project, you can just more or less write the file name quickly, and it will be able to find it even if you miss capitalization and extensions.

The following is a basic setup of [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)

{: .codeblock data-title="lua/plugins/telescope.lua"}
```lua
return {
    'nvim-telescope/telescope.nvim', tag = '0.1.8',
    dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
        local builtin = require('telescope.builtin')
        vim.keymap.set('n', '<leader>sf', builtin.find_files, { desc = 'Telescope find files' })
        vim.keymap.set('n', '<leader>sg', builtin.live_grep, { desc = 'Telescope live grep' })
        vim.keymap.set('n', '<leader>sb', builtin.buffers, { desc = 'Telescope buffers' })
        vim.keymap.set('n', '<leader>sh', builtin.help_tags, { desc = 'Telescope help tags' })
    end
}
```

Add it to your `init.lua`

{: .codeblock data-title="init.lua"}
```lua
require("lazy").setup({
    require("plugins.colorscheme"),
    require("plugins.nvim-tree"),
    require("plugins.telescope"),
})
```

When you restart `nvim`, the `telescope` plugin will be installed, and you will be able to search your files with `<leader>sf` as we set it up.

## Bufferline

In neovim, your usual _tabs_ are called buffers, since _tab_ already has another meaning. Typically you will want a way to visualize and ideally click on them. There are many plugins that do this, a very popular is [bufferline.nvim](https://github.com/akinsho/bufferline.nvim). A basic setup looks like the following

{: .codeblock data-title="lua/plugins/bufferline.lua"}
```lua
return {
  'akinsho/bufferline.nvim',
  dependencies = 'kyazdani42/nvim-web-devicons',
  config = function()
    local status_ok, bufferline = pcall(require, "bufferline")
    if not status_ok then
      return
    end
    vim.opt.termguicolors = true
    bufferline.setup {}
  end
}
```

Add it to your `init.lua`

{: .codeblock data-title="init.lua"}
```lua
require("lazy").setup({
    require("plugins.colorscheme"),
    require("plugins.nvim-tree"),
    require("plugins.telescope"),
    require("plugins.bufferline"),
})
```

As we set up in `keymaps.lua`, you can change bufffers with `<S-h>` and `<S-l>`.

# Status Line

The last piece of basic setup we need is a _status line_ since the one built-in neovim is _hard to see_ (to say the least). A popular plugin for this is [nvim-lualine](https://github.com/nvim-lualine/lualine.nvim). A basic setup looks like the following

{: .codeblock data-title="lua/plugins/lualine.lua"}
```lua
return {
  'nvim-lualine/lualine.nvim',
  dependencies = { 'nvim-tree/nvim-web-devicons' },
  config = function()
    local lualine = require("lualine")
    lualine.setup({
      options = {
        icons_enabled = true,
        theme = 'auto',
        component_separators = { left = '', right = ''},
        section_separators = { left = '', right = ''},
        disabled_filetypes = {
          statusline = {},
          winbar = {},
        },
        ignore_focus = {},
        always_divide_middle = true,
        globalstatus = false,
        refresh = {
          statusline = 1000,
          tabline = 1000,
          winbar = 1000,
        }
      },
      sections = {
        lualine_a = {'mode'},
        lualine_b = {'branch', 'diff', 'diagnostics'},
        lualine_c = {'filename'},
        lualine_x = {'encoding', 'fileformat', 'filetype'},
        lualine_y = {'progress'},
        lualine_z = {'location'}
      },
      inactive_sections = {
        lualine_a = {},
        lualine_b = {},
        lualine_c = {'filename'},
        lualine_x = {'location'},
        lualine_y = {},
        lualine_z = {}
      },
      tabline = {},
      winbar = {},
      inactive_winbar = {},
      extensions = {}
    })
  end
}
```

Add it to your `init.lua`

{: .codeblock data-title="init.lua"}
```lua
require("lazy").setup({
    require("plugins.colorscheme"),
    require("plugins.nvim-tree"),
    require("plugins.telescope"),
    require("plugins.bufferline"),
    require("plugins.lualine"),
})
```

# Language Server Protocol
...
