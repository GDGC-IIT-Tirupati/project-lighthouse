FROM mcr.microsoft.com/devcontainers/python:3.13-bookworm

# Install uv from the official Astral binary
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set uv link mode to copy to prevent hard link issues in dev container volume mounts
ENV UV_LINK_MODE=copy
ENV UV_CACHE_DIR=/home/vscode/.cache/uv
ENV NPM_CONFIG_CACHE=/home/vscode/.npm

RUN mkdir -p /home/vscode/.cache/uv /home/vscode/.npm \
    && chown -R vscode:vscode /home/vscode/.cache /home/vscode/.npm

WORKDIR /workspace
