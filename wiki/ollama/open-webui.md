---
title: "Ollama: Open WebUI"
description: "Ollama integration with Open WebUI"
permalink: /ollama/open-webui/
redirect_from:
  - /ollama.openwebui
---

# Ollama: Open Web UI

This is a guide on how to integrate `ollama` with [Open WebUI](https://openwebui.com/) for self-hosting LLMs.

First install Docker. See the [Docker page](/linux/docker/) for local setup.

## Quick Start

If you only want to launch Open WebUI itself and connect it to an existing Ollama instance, the official quick-start is:

```bash
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

Then open [http://localhost:3000](http://localhost:3000).

{: .note}
> Open WebUI automatically attempts to connect to an Ollama instance. If that fails, check the Ollama connection settings from the admin panel after the first login.

## NVIDIA GPUs

The official NVIDIA-enabled image uses the `:cuda` tag and Docker GPU support:

```bash
docker run -d -p 3000:8080 \
  --gpus all \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:cuda
```

{: .note}
> This only handles the Open WebUI container itself. Your Ollama setup still needs to expose a working model backend separately.

## AMD GPUs
```bash
sudo pacman -S docker docker-compose
```

Take for reference this docker compose file that was posted [on reddit](https://www.reddit.com/r/ollama/comments/1gec1nx/docker_compose_for_amd_users/)

{: .codeblock data-title="docker-compose.yml"}
```
services:

  ollama:
    image: ollama/ollama:rocm
    container_name: ollama
    environment:
      OLLAMA_MODELS: /usr/share/ollama
      HSA_OVERRIDE_GFX_VERSION: "X.Y.Z"
      HIP_VISIBLE_DEVICES: "0"
    devices:
      - "/dev/kfd"
      - "/dev/dri"
    security_opt:
      - seccomp:unconfined
    cap_add:
      - SYS_PTRACE
    ipc: host
    group_add:
      - video
    volumes:
      - /home/username/.ollama:/root/.ollama
      - /home/username/ollama/models:/usr/share/ollama
    ports:
      - "11434:11434"
    networks:
      backend:
        ipv4_address: 10.1.0.2

  open-webui:
    image: ghcr.io/open-webui/open-webui:cuda
    container_name: open-webui
    environment:
      OLLAMA_BASE_URL: http://10.1.0.2:11434
      HSA_OVERRIDE_GFX_VERSION: "X.Y.Z"
      HIP_VISIBLE_DEVICES: "0"
    devices:
      - "/dev/kfd"
      - "/dev/dri"
    security_opt:
      - seccomp:unconfined
    cap_add:
      - SYS_PTRACE
    ipc: host
    group_add:
      - video
    volumes:
      - /home/username/.open-webui:/app/backend/data
    ports:
      - "3000:8080"
    networks:
      backend:
        ipv4_address: 10.1.0.3

networks:
  backend:
    driver: bridge
    ipam:
      config:
        - subnet: 10.1.0.0/16
          gateway: 10.1.0.1
```

Create in a project directory a `docker-compose.yml`, and execute
```bash
docker compose up -d
```

{: .warning}
> Don't forget to substitute the correct `username` and `X.Y.Z` GFX version in the compose file. See the [Ollama Guide](/ollama/) for more information.

Then access [http://localhost:3000](http://localhost:3000) in your web browser. You should be able to see the Open WebUI login screen.

To stop the services
```bash
docker compose down
```

{: .warning}
> There might be conflicts with the default port for `ollama.service`, run
>```bash
>sudo lsof -i :11434
>```
>to verify. Either stop the ollama daemon, or change the docker compose file to another port.
