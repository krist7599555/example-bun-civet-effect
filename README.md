# example-bun-civet-effect

```bash
bun install
bun run src/index.civet
bunx civet -c ./src/index.civet -o ./src/index.ts
#dev
node ./node_modules/.bin/civetman --noVscode dev
```

Effect wrapper `Effect.flatMap` and `Effect.pipe` not work on infer second parameter