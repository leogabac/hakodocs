---
title: Ollama: Open WebUI
description: Ollama integration with Open WebUI
---

# Ollama: Open Web UI

This is a guide on how to integrate `ollama` with [Open WebUI](https://openwebui.com/) for self-hosting LLMs.

First install `docker` and `docker-compose`

## NVIDIA GPUs

WIP

## AMD GPUs
```bash
sudo pacman -S docker docker-compose
```

Take for reference this docker compose file that was posted [reddit](https://www.reddit.com/r/ollama/comments/1gec1nx/docker_compose_for_amd_users/)
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
> __WARNING:__  
> Don't forget to substitute in the docker compose file the correct `username`. and `X.Y.Z` for your GFX. See the [Ollama Guide](ollama) for more information.

Then access [http://localhost:3000](http://localhost:3000) on your web browser. You should be able to see the the Open WebUI login screen.

To stop the services
```bash
docker compose down
```

{: .warning}
> __WARNING:__  
> There might be conflicts with the default port for `ollama.service`, run
>```bash
>sudo lsof -i :11434
>```
>to verify. Either stop the ollama daemon, or change the docker compose file to another port.

