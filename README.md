# Math Grader

This is a math grader system designed for [Math P' Earth](https://math-p-earth.com). The project is split into multiple packages:
1. `web`: The frontend component used by students, implemented with Next.js and TailwindCSS.
2. `cms`: The backend and content management system used by admins. Powered by [PayloadCMS](https://payloadcms.com) and MongoDB.
3. `math-worker`: A python service that handles complex math calculations. Mostly stuffs that require python packages or CLIs. This is located in a separate private repository.

## Development
### Prerequisites
1. pnpm >= 8.6.1
2. Node 18
3. Docker for running mongo locally. You can also use a remote mongo instance.

### Setup
1. Clone the repository
```bash
$ git clone git@github.com:math-p-earth/math-grader-frontend.git
```
2. Install dependencies
```bash
$ pnpm install
```
3. Copy `.env.example` to `.env.local` and fill in the values.
4. Run the project
```bash
$ pnpm dev
``` 
To run sepecific packages, use `pnpm dev --scope <package-name>`. For example, to run only the `web` package, use `pnpm dev --scope web`.

## Deployment
### Develop
1. Merge your changes to `develop` branch.
2. Rebase/fast-forward to deploy branch `deploy/<app>-develop`. For example, to deploy the `web` package, push to `deploy/web-develop`.
3. This will trigger GitHub Actions to build and deploy the app to Google Cloud Run.

### Production
1. Merge your changes to `main` branch.
2. Push tag to `<app>@v<version>`. For example, to deploy `web` version `1.0.0`, push tag `web@v1.0.0`.
3. This will trigger GitHub Actions to build and deploy the app to production server.

## Contact
- [Math P' Earth page](https://www.facebook.com/MathPEarth)
