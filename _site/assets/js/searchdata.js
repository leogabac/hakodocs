
var jsondata=[
  
  ,
  
   {
     
     
        "title"    : "404.html",
        "category" : "",
        "tags"     : "",
        "url"      : "/404.html",
        "date"     : "",
        "content"  : "<!--- this file is needed for automatic creation of non existent pages --->\n"
     
   } ,
  
   {
     
     
        "title"    : "Arch Linux",
        "category" : "",
        "tags"     : "",
        "url"      : "/archlinux",
        "date"     : "",
        "content"  : "<h1 id=\"arch-linux\">Arch Linux</h1>\n\n<p>Arch Linux is a <em>rolling-release</em> distribution, i.e.  <em>packages</em> (software) receive updates constantly. There is not a concensus on how often one needs to update their system, a good rule of thumb is once per week.</p>\n\n<blockquote>\n  <p><strong>PRO TIP:</strong><br />\nIf case something happens, <strong>always</strong> check the <a href=\"https://wiki.archlinux.org/title/Main_page\">Arch Wiki</a> first. It always help, no matter the problem you may have. Read <strong>very</strong> carefully the instructions, and don’t skip steps. I have encountered many problems for literally not reading the next line in the wiki.</p>\n</blockquote>\n\n<p>This guide serves as both a beginner guide to know that to check after they install Arch Linux for the first time, but also a checklist for myself to remember what to look for in a new installation. I will assume that you installed KDE Plasma as your Desktop Environment.</p>\n\n<h2 id=\"the-package-manager\">The package Manager</h2>\n\n<p>As in any Linux distribution, Arch Linux has a <em>package manager</em> called <code class=\"language-plaintext highlighter-rouge\">pacman</code> that installs software from the <em>Arch repository</em> . Package names may differ from other distributions, so it is recommended that you check on the <a href=\"https://archlinux.org/packages/\">repositories</a> or the <a href=\"https://wiki.archlinux.org/title/Main_page\">Arch Wiki</a> how to install particular software.</p>\n\n<p>To install packages simply run</p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> PACKAGE_NAME\n</code></pre></div></div>\n<p>where the <code class=\"language-plaintext highlighter-rouge\">-S</code> flag stands for <em>Sync</em>. It basically reads</p>\n\n<blockquote>\n  <p>Sync from the pacman (Arch) repository PACKAGE_NAME with my system</p>\n</blockquote>\n\n<h2 id=\"the-arch-user-repository\">The Arch User Repository</h2>\n<p>Not every piece of software can be found in the regular Arch repositories. Take for example <code class=\"language-plaintext highlighter-rouge\">dropbox</code>, that has official support for Debian/Ubuntu, but not for Arch Linux. Another example would be software that need to be <em>compiled from source</em> like <code class=\"language-plaintext highlighter-rouge\">lammps</code>, <code class=\"language-plaintext highlighter-rouge\">gromacs</code> or some of the <code class=\"language-plaintext highlighter-rouge\">xp-pen</code> drivers for their tablets. Manually repackaging, or compiling from source will install the software on your system at the cost of not being properly managed by <code class=\"language-plaintext highlighter-rouge\">pacman</code>. On such cases we turn to the so-called <em>Arch User Repository</em> (AUR).</p>\n\n<p>The Arch User Repository (AUR) is a community-driven repository for Arch Linux that allows users to share and install packages not available in the official Arch repositories. Unlike the official repos, which provide precompiled binaries, the AUR contains <em>PKGBUILD</em> scripts—text files that define how to download, compile, and install software from source or external sources like .deb packages. Users can manually download a PKGBUILD and run <code class=\"language-plaintext highlighter-rouge\">makepkg -si</code> to build and install the package, or use an <em>AUR helper</em> like <code class=\"language-plaintext highlighter-rouge\">yay</code> or <code class=\"language-plaintext highlighter-rouge\">paru</code> to automate the process. Since AUR packages are maintained by the community, they are not officially supported by Arch and may require user intervention if dependencies or builds break.</p>\n\n<p>To install <code class=\"language-plaintext highlighter-rouge\">yay</code> as an AUR helper, run</p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> <span class=\"nt\">--needed</span> base-devel git\n<span class=\"nb\">mkdir</span> /tmp/yay\ngit clone https://aur.archlinux.org/yay.git /tmp/yay\n<span class=\"nb\">cd</span> /tmp/yay\nmakepkg <span class=\"nt\">-si</span>\n</code></pre></div></div>\n<p>Then from the AUR, we can install with same flags as in <code class=\"language-plaintext highlighter-rouge\">pacman</code></p>\n<div class=\"language-plaintext highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>yay -S PACKAGE_NAME\n</code></pre></div></div>\n<p>When yay installs an AUR package, it first downloads the <em>PKGBUILD</em> script, builds the package into a <code class=\"language-plaintext highlighter-rouge\">.pkg.tar.zst</code> file, and then installs it using <code class=\"language-plaintext highlighter-rouge\">pacman -U</code>. Since pacman tracks all installed packages in its local database (/var/lib/pacman/), the AUR package becomes indistinguishable from an official package in terms of management. This means <code class=\"language-plaintext highlighter-rouge\">pacman -Q</code> can list it, <code class=\"language-plaintext highlighter-rouge\">pacman -R</code> can remove it, and <code class=\"language-plaintext highlighter-rouge\">pacman -U</code> can reinstall it.</p>\n\n<p>Because AUR packages are not in the official repositories, <code class=\"language-plaintext highlighter-rouge\">pacman -Syu</code> does not update them—users must manually rebuild them or use an AUR helper like <code class=\"language-plaintext highlighter-rouge\">yay -Syu</code>, which automates the update process by fetching new <em>PKGBUILD</em> versions and repeating the build-and-install process.</p>\n\n<h2 id=\"full-system-upgrade\">Full System Upgrade</h2>\n<p>Arch Linux receives constant updates, to make a <em>full system upgrade</em> run</p>\n<div class=\"language-plaintext highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>sudo pacman -Syu\n</code></pre></div></div>\n<blockquote>\n  <p><strong>WARNING:</strong>\nAlways make sure to read what packages are being updated.</p>\n</blockquote>\n\n<h1 id=\"system-sanity-check\">System Sanity Check</h1>\n<p>First thing, is that we need to check if all basic functionalities are working properly. In some sections I don’t have any particular advice, as they usually work out of the box. In such cases, I will simply provide a link to their ArchWiki page.</p>\n\n<h2 id=\"network\">Network</h2>\n<p>Check <a href=\"https://wiki.archlinux.org/title/Network_configuration/Wireless\">Network configuration</a> on the ArchWiki.</p>\n\n<h2 id=\"sound\">Sound</h2>\n<p>Check <a href=\"https://wiki.archlinux.org/title/Sound_system\">Sound system</a> on the ArchWiki.</p>\n\n<h2 id=\"bluetooth\">Bluetooth</h2>\n\n<p>Some extra packages will be necessary.</p>\n\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> bluez bluez-utils bluez-deprecated-tools\n</code></pre></div></div>\n\n<p>Typically the Bluetooth Services is not enabled by default.</p>\n\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>systemctl start bluetooth.service\n<span class=\"nb\">sudo </span>systemctl <span class=\"nb\">enable </span>bluetooth.service\n</code></pre></div></div>\n\n<p>Sometimes you will need to reboot your PC for everything to work properly.</p>\n\n<h3 id=\"sound-through-bluetooth\">Sound through Bluetooth</h3>\n<p>Check <a href=\"https://wiki.archlinux.org/title/Bluetooth_headset\">Bluetooth headset</a> on the ArchWiki.</p>\n\n<h2 id=\"keyboard-backlight\">Keyboard Backlight</h2>\n<p>The frontend that controls the backlight is not installed.</p>\n\n<div class=\"language-plaintext highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>sudo pacman -S brightnessctl\n</code></pre></div></div>\n<p>If that does not solve it, check <a href=\"https://wiki.archlinux.org/title/Keyboard_backlight\">Keyboard backlight</a> on the Archwiki.</p>\n\n<h2 id=\"screenshots\">Screenshots</h2>\n<p>The software that takes screenshots is not installed. For KDE Plasma use <code class=\"language-plaintext highlighter-rouge\">spectacle</code>.</p>\n\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> spectacle\n</code></pre></div></div>\n\n<h2 id=\"monitors\">Monitors</h2>\n<p>In particular,</p>\n<ol>\n  <li>All monitors connect correctly, in particular those that use Thunderbolt/USB4.</li>\n  <li>All monitors run at their respective refresh rate.</li>\n</ol>\n\n<h2 id=\"graphics-card\">Graphics Card</h2>\n<p>There are a few ways to make sure your dedicated graphics card is working.</p>\n\n<h3 id=\"card-is-detected\">Card Is Detected</h3>\n<ol>\n  <li>In KDE Plasma, look for the <em>About</em> setting, it should list all of your components.</li>\n  <li>Using fastfetch\n    <div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> fastfetch\nfastfech\n</code></pre></div>    </div>\n  </li>\n  <li>Using <code class=\"language-plaintext highlighter-rouge\">lspci</code>\n    <div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>lspci | <span class=\"nb\">grep</span> <span class=\"nt\">-i</span> vga\n</code></pre></div>    </div>\n  </li>\n</ol>\n\n<h3 id=\"opengl-renderer\">OpenGL Renderer</h3>\n<p>You can check the default OpenGL rendered for your system to make sure which card is currently being used</p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>glxinfo | <span class=\"nb\">grep</span> <span class=\"s2\">\"OpenGL renderer\"</span>\n</code></pre></div></div>\n<blockquote>\n  <p>OpenGL renderer string: AMD Radeon RX 6650M (radeonsi, navi23, LLVM 19.1.6, DRM 3.59, 6.12.9-arch1-1)</p>\n</blockquote>\n\n<p>This will list the current renderer and used driver. If it is not the correct one, you can force it with the <code class=\"language-plaintext highlighter-rouge\">DRI_PRIME</code> environment variable.</p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nv\">DRI_PRIME</span><span class=\"o\">=</span>1 glxinfo | <span class=\"nb\">grep</span> <span class=\"s2\">\"OpenGL renderer\"</span>\n</code></pre></div></div>\n<blockquote>\n  <p>OpenGL renderer string: AMD Radeon 780M (radeonsi, gfx1103_r1, LLVM 19.1.6, DRM 3.59, 6.12.9-arch1-1)</p>\n</blockquote>\n\n<p>As a final sanity check, a good way to <em>really</em> make sure your card is working is by launching minecraft. You can install it from the AUR</p>\n<div class=\"language-plaintext highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>yay -S minecraft-launcher\n</code></pre></div></div>\n<p>In a world, press F3 and check the <em>display</em> information on the right side. If you see the incorrect graphics card, change Plasma to use the other one as default, or force the application launcher to use the correct <code class=\"language-plaintext highlighter-rouge\">DRI_PRIME</code> variable state.</p>\n\n<p>I am not sure on how this is configured, typically after a few restards, Plasma always decides to use the dedicated graphics.</p>\n\n<h1 id=\"text-editor\">Text Editor</h1>\n\n<h2 id=\"vscode\">VSCode</h2>\n<p>There are many text editors on Linux. VSCode is a Microsoft editor with enabled telemetry, Linux users do not like that for privacy concerns. VSCodium is a community open-source release that nullifies telemetry, and is available in the AUR. For Arch Linux, there is an official OSS release</p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> code\n</code></pre></div></div>\n<p>For more information, read the <a href=\"https://wiki.archlinux.org/title/Visual_Studio_Code\">VSCode Arch Wiki Page</a>.</p>\n\n<h2 id=\"neovim\">Neovim</h2>\n<p>I personally use <code class=\"language-plaintext highlighter-rouge\">nvim</code> with my own configuration.</p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> nvim\ngit clone https://github.com/leogabac/leovim.git ~/.config/nvim\nnvim\n</code></pre></div></div>\n<p>Check the <a href=\"https://github.com/leogabac/leovim\">leovim repository</a> for more information.</p>\n\n"
     
   } ,
  
   {
     
     
        "title"    : "Home",
        "category" : "",
        "tags"     : "",
        "url"      : "/home",
        "date"     : "",
        "content"  : "<h1 id=\"welcome-to-hakodocs\">Welcome to HakoDocs!</h1>\n<p>HakoDocs is a public compilation of tech-related notes that address specific problems I’ve encountered throughout my life.\nYou can expect to find <em>How to do \\(X\\)</em> guides for a variety of topics, primarily related to Linux, programming languages, servers, and more.\nI started this project as a personal collection of notes, and as I began sharing them with my colleagues, it grew into something more.\nThe same colleagues these notes once helped started contributing to them. I hope you, like them, find something useful within this <em>hako</em>.</p>\n\n<blockquote>\n  <p><strong>DISCLAIMER:</strong> Many of the content in these notes is centered around Arch Linux as that is my daily driver.</p>\n</blockquote>\n\n"
     
   } ,
  
   {
     
     
        "title"    : "index.html",
        "category" : "",
        "tags"     : "",
        "url"      : "/assets/blog/",
        "date"     : "",
        "content"  : "<!--- this file is needed for automatic creation of blog page --->"
     
   } ,
  
   {
     
     
        "title"    : "Python",
        "category" : "",
        "tags"     : "",
        "url"      : "/python",
        "date"     : "",
        "content"  : "<h1 id=\"python\">Python</h1>\n\n<p>Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is widely used in web development, data science, automation, artificial intelligence, and scientific computing due to its extensive libraries and active community.</p>\n\n<p>This article is a basic guide on the common setups one has to deal with in Python.</p>\n\n<h2 id=\"installation\">Installation</h2>\n\n<p>WIP</p>\n\n<h1 id=\"virtual-environments\">Virtual Environments</h1>\n\n<p>I use a lot of virtual environments to not break system packages. “Global” environments are stored in <code class=\"language-plaintext highlighter-rouge\">~/.virtualenvs/</code>.</p>\n\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">sudo </span>pacman <span class=\"nt\">-S</span> python-virtualenv\n<span class=\"nb\">mkdir</span> ~/.virtualenvs/\n</code></pre></div></div>\n\n<p>As an example, let’s make a virtualenv called <code class=\"language-plaintext highlighter-rouge\">pyglobal</code>, run</p>\n\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>virtualenv ~/.virtualenvs/pyglobal\n<span class=\"nb\">source</span> ~/.virtualenvs/global/bin/activate\n</code></pre></div></div>\n\n<p>Add an alias to the environment in your <code class=\"language-plaintext highlighter-rouge\">~/.bashrc</code></p>\n\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code><span class=\"nb\">alias </span><span class=\"nv\">pyglobal</span><span class=\"o\">=</span><span class=\"s2\">\"source ~/.virtualenvs/global/bin/activate\"</span>\n</code></pre></div></div>\n\n<h2 id=\"pyenv\">pyenv</h2>\n\n<p>More often than not, we need to manage multiple python versions since ArchLinux changes versions more often that I like it. To accomplish this, I make a virtual environment that uses a particular python binary. This binary can either be compiled manually, installed from the AUR, or in this case using pyenv.</p>\n\n<p>Pyenv does a lot of things, but I personally use it as an installer and manager of python versions. Following their <a href=\"https://github.com/pyenv/pyenv\">documentation</a></p>\n<div class=\"language-bash highlighter-rouge\"><div class=\"highlight\"><pre class=\"highlight\"><code>virtualenv <span class=\"nt\">--python</span><span class=\"o\">=</span>/home/USER/.pyenv/versions/3.12.0/bin/python3.12 /home/USER/.virtualenv/py3.12\n</code></pre></div></div>\n\n<blockquote>\n  <p><strong>WARNING:</strong><br />\nIt is really important to give the full path to the python binaries. Otherwise it can throw you a RuntimeError.</p>\n</blockquote>\n\n"
     
   } ,
  
   {
     
     
        "title"    : "LaTeX",
        "category" : "",
        "tags"     : "",
        "url"      : "/latex",
        "date"     : "",
        "content"  : "# LaTeX\n\nTo work with LaTeX, you need a compiler. In Linux we typically use `texlive`, for more information you can read the [TexLive Arch Wiki Page](https://wiki.archlinux.org/title/TeX_Live) and the [texlive package group](https://archlinux.org/groups/x86_64/texlive/).\n\nA basic setup is obtained by installing the whole group.\n```bash\nsudo pacman -S texlive\n```\nFrom this, your selected LaTeX editor should pickup the `latex` command in PATH.\n\n\n"
     
   } ,
  
   {
     
     
        "title"    : "Timeshift",
        "category" : "",
        "tags"     : "",
        "url"      : "/timeshift",
        "date"     : "",
        "content"  : "# Timeshift\n\nTimeshift is a backup and restore tool for Linux that creates system snapshots, allowing users to revert their system to a previous state in case of errors, updates gone wrong, or system corruption. It works similarly to Windows System Restore or macOS Time Machine but focuses on system files rather than personal data. Timeshift supports `rsync` (incremental backups with hard links) and `btrfs` snapshots (for filesystems with built-in snapshot support).\n\nA good practice is to make a system snapshot with `timeshift` before making a full system upgrade. Here I will provide a basic setup to accomplish this, but you can read the [Timeshift Arch Wiki Page](https://wiki.archlinux.org/title/Timeshift) for more information.\n\nInstall the package and enable a chosen cron scheduler (`cronie` for this case)\n```bash\nsudo pacman -S timeshift cronie\nsudo systemctl start cronie.service\nsudo systemctl enable cronie.service\n```\n> __RECOMMENDED:__   \n> Open the Timeshift GUI from your applications menu and make an initial setup by clicking on _Wizard_\\\n> For ext4 filesystems:\\\n> 1. Choose `rsync`.\\\n> 2. Choose your disk.\\\n> 3. Select daily snapshots and keep from 2-3 of them.\\\n> 4. Click finish\n\nAlthough you can manipulate Timeshift with a GUI, the _Command Line Interface_ (CLI) helps with automation of snapshops. For example, you can make a bash script that makes a snapshot, and then a full system upgrade\n```bash\n#!/bin/bash\n\nsudo timeshift --create --comments \"update $(date +%y)w$(date +%U)\"\nsudo pacman -Syu\n```\n\nThis creates a snapshop with a comment _update ##w##_ that updates with the year and current week, e.g. _25w13_ is Week 13 of 2025.\n\nAfter the snapshot, it upgrades the system.\n\n\n"
     
   } ,
  
   {
     
     
        "title"    : "redirect.html",
        "category" : "",
        "tags"     : "",
        "url"      : "/",
        "date"     : "",
        "content"  : ""
     
   } 
  
];

var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: jsondata,
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  })


