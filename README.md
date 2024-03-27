# spi-proxy-worker

A Cloudlfalre worker to proxy request to https://swiftpackageindex.com. To learn more about workers read [this](https://developers.cloudflare.com/workers/)

> [!WARNING]
> Currently deployed at https://spi-proxy-worker.dev-capturecontext-8f5.workers.dev

## Getting Started

You need a `node.js` and `npm`. I recommend installing [nvm](https://github.com/nvm-sh/nvm) to manage `js` related stuff and don’t mess with a system. 

To get started run:

```shell
make boostrap
```

## Local Development

To run localy use:

```shell
make run
```

> [!WARNING]
> You need to create a `.dev.vars` file at the root of the project and provide an `API_TOKEN` variable in following format `API_TOKEN=<TOKEN>`. To learn more read https://developers.cloudflare.com/workers/configuration/secrets/


## Deployment

To deploy a project to Cloudflare run:

```shell
make deploy
```

> [!WARNING]
> You need to add an `API_TOKEN` to a deployed worker. To do this run `npx wrangler secret put API_TOKEN` and put a token value when prompted.

> [!WARNING]
> If command fails with `Authentication error` try running `npx wrangler login` first