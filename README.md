# personal portfolio

## Description

### Run locally with Docker

```bash
docker build -t personal-portfolio:latest . && docker stop personal-portfolio-container || true && docker rm personal-portfolio-container || true && docker run -d --name personal-portfolio-container -p 8080:80 --restart unless-stopped personal-portfolio:latest
```


### Playwright

- Check Website Sections and Language Selector

    npx playwright test playwright-report/checkwebsitesections_4f2f0259-c34c-4198-b6c5-bc9a5a1f5fe8.spec.ts