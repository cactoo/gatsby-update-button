# Gasby Update Message Demo

Demo app checking Service Worker for updates and showing "update app" button. Nice way to check for new app version without reloading. It relies on [service-worker-updater package](https://www.npmjs.com/package/service-worker-updater). Check out Gatsby [#19705 issue](https://github.com/gatsbyjs/gatsby/issues/19705) for more info.

## Installation

Just as regular project:

```shell
  git clone https://github.com/cactoo/gatsby-update-message.git
  cd gatsby-update-message
  yarn
  yarn run dev
```

## How to check how it works?

Create site build (`yarn build`) and serve it (`yarn serve`). Then open [localhost:9000](localhost:9000) in your browser. To trigger service worker update, edit `public/sw.js` file (just modify it, ex. add some comment at the end). And wait. You'll see nice green button **Update App** in max 15s. You can just do refresh.

## Read more

Read more about Service Worker lifecycles here:
[https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
