# HakoDocs

Source for a Jekyll-based personal wiki of technical notes.

## Repository Model

This repository is the source of truth.

- Author content in [`wiki/`](/home/holo/Documents/projects/hakodocs/wiki)
- Keep theme assets and layout files in [`assets/`](/home/holo/Documents/projects/hakodocs/assets), [`_includes/`](/home/holo/Documents/projects/hakodocs/_includes), [`_layouts/`](/home/holo/Documents/projects/hakodocs/_layouts), and [`_sass/`](/home/holo/Documents/projects/hakodocs/_sass)
- Treat [`_site/`](/home/holo/Documents/projects/hakodocs/_site) as generated output only

Generated site output should not be committed. Publishing should build from source.

## Local Development

The Docker workflow is the intended local workflow.

1. Build the image:

```bash
./build-image
```

2. Serve the wiki locally:

```bash
./run-image
```

The site will be available at `http://localhost:4000`.

The Git-based wiki links in the UI assume the source branch is `main`.

## Publish

The repository is set up to publish from source via GitHub Actions on pushes to `main` or `master`, or by manual workflow dispatch.

## Notes

- Repo-only files such as `Dockerfile`, `README.md`, and helper scripts are excluded from the generated site.
- Blog-specific template features are removed because this repo currently uses the wiki content model only.
