---
title: "Contributions"
description: "Contributions"
---

# Contributions


## Guidelines

There are no specific contribution guidelines yet, other than
1. Try to keep the style consistent
2. Make a pull request
3. Have common sense

For new pages:
1. Put related notes in the same section folder under `wiki/`
2. Prefer lowercase kebab-case filenames
3. Prefer section-based URLs such as `/python/jupyter/` over dotted slugs
4. Avoid generic catch-all folders like `articles/` when a topic section already exists

## How to make an article?

Create a Markdown file under the most relevant section inside `wiki/`. A good default pattern is:

```text
wiki/<section>/<topic>.md
```

Use front matter at the top:

```yaml
---
title: "Page Title"
description: "Short one-line summary"
permalink: /section/topic/
---
```

If you rename or move an existing page, keep old links working:

```yaml
redirect_from:
  - /old-slug
```

Practical checklist:
1. Write a short intro that explains what problem the page solves.
2. Put installation steps before advanced usage when possible.
3. Prefer copy-pasteable commands.
4. Link to upstream docs for moving targets such as package installs, container images, and web services.
5. Add internal links to related HakoDocs pages when they actually help navigation.

If you are adding a brand-new topic, update [`wiki/home.md`](/home/holo/Documents/projects/hakodocs/wiki/home.md:31) so the section is discoverable from the homepage.


## Running the server locally

The repository provides a `Dockerfile` to run the server locally. Simply build the image with the provided script
```bash
./build-image
```
This process will create the image `hakodocs:latest` and needs to be done only once. Then, run the server with
```bash
./run-image
```
which will make the local site visible at [http://localhost:4000/](http://localhost:4000/)
