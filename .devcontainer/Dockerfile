FROM mcr.microsoft.com/devcontainers/python:3.13-bookworm

# Install uv from the official Astral binary
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set uv link mode to copy to prevent hard link issues in dev container volume mounts
ENV UV_LINK_MODE=copy
