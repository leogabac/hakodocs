---
title: "Contributions"
description: "Contributions"
---

# Contributions

## Setting up the environment

Since I have not had the time for setting up a proper docker container with the jekyll server, here is small guide on how to set everything up locally.

1. Install `ruby`
```bash
sudo pacman -S ruby
```
2. Install the corresponding gems
```bash
gem install rails
gem install jekyll
gem install jekyll bundler
```
3. Figure out the path where those gems are
```
gem which bundler
# e.g. output
#  /home/holo/.local/share/gem/ruby/3.4.0/gems/bundler-2.7.2/lib/bundler.rb
```
4. Add that to `PATH`
```bash
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH"
```
5. cd into the repo and install the rest of the gems into a local path
```bash
bundle install --path vendor/bundle
```
6. Then you can run
```bash
bundle exec jekyll serve
```
Which will make the local site visible at [http://localhost:4000/home](http://localhost:4000/home)

