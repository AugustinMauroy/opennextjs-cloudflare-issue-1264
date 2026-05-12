## [`opennextjs-cloudflare`#1264](https://github.com/opennextjs/opennextjs-cloudflare/issues/1264#issuecomment-4434042536) report

## Pre-requisites

- node v24

## Dev env (working)

1. install dep

```bash
npm install
```

2. run dev
```bash
node --run dev
```

3. open http://localhost:3000/ and see any error wow
4. open http://localhost:3000/test-binding to test bidding with CF d1 & r2

## Preview env

1. install dep

```bash
npm install
```

2. run preview
```bash
node --run preview
```

3. open http://localhost:8787 and see any error wow
4. open http://localhost:8787/test-binding to test bidding with CF d1 & r2

## Test with playwright

1. install dep

```bash
npm install
```

2. run test

```bash
node --run test:e2e
```

3. you should recive `ERROR: getCloudflareContext has been called without having called initOpenNextCloudflareForDev from the Next.js config file.`