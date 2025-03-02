# personal portfolio

## Description

### Run locally with Docker

```bash
docker build -t personal-portfolio:latest . && docker stop personal-portfolio-container || true && docker rm personal-portfolio-container || true && docker run -d --name personal-portfolio-container -p 8080:80 --restart unless-stopped personal-portfolio:latest
```