# Observables using Web Streams (JS/TS)

A catalog of
[Sources](https://jsr.io/@cloudydeno/stream-observables/doc/sources),
[Transforms](https://jsr.io/@cloudydeno/stream-observables/doc/transforms),
[Sinks](https://jsr.io/@cloudydeno/stream-observables/doc/sinks), and
[Combiners](https://jsr.io/@cloudydeno/stream-observables/doc/combiners)
(a la ReactiveX)
implemented using the Web Streams API (a la `TransformStream`)
which is now native to all modern Javascript runtimes.

## Background

Useful for modules that want to process data or object `ReadableStream`s with a more concise API,
or when producing programs that want to react to multiple inbound data sources in an ordered way.
Transforms from this library seamlessly interoperate with normal `TransformStream` implementations
such as `CompressionStream`.

This module has no dependencies and considered feature-complete.
Updates are generally only for improved compatibility with newer runtimes.

A Deno-friendly port
of [surma's observables-with-streams](https://github.com/surma/observables-with-streams).

## 🚨 Breaking Change in `v1.5.0`

All exported modules were renamed to remove `.ts` extensions and `/mod.ts` filenames.

If you only import the default export (`@cloudydeno/stream-observables`) then you don't need to change anything.

| Import specifier in v1.4 and earlier              | Import specifier starting in v1.5              |
|---------------------------------------------------|------------------------------------------------|
| `@cloudydeno/stream-observables/mod.ts`           | `@cloudydeno/stream-observables`               |
| `@cloudydeno/stream-observables/sinks/mod.ts`     | `@cloudydeno/stream-observables/sinks`         |
| `@cloudydeno/stream-observables/sinks/collect.ts` | `@cloudydeno/stream-observables/sinks/collect` |

## Installation

Releases are [published to `jsr:@cloudydeno/stream-observables`](https://jsr.io/@cloudydeno/stream-observables).
The sidebar contains setup instructions for the common package managers.
Read more about [using packages](https://jsr.io/docs/using-packages).

For example, when using Deno:

```sh
deno add jsr:@cloudydeno/stream-observables
```

or Yarn (on nodejs):

```sh
yarn add jsr:@cloudydeno/stream-observables
```

Also previously published to `/x/`: `https://deno.land/x/stream_observables@v1.3/`
This frozen release won't be receiving further releases.

## Example Usage

```typescript
import * as ows from "@cloudydeno/stream-observables";

console.log('Tap Enter to add energy!');
ows.merge(
  ows.fromTimer(1000)
    .pipeThrough(ows.map(() => -1)),
  ows.fromIterable(Deno.stdin.readable)
    .pipeThrough(ows.map(() => 1)),
)
  .pipeThrough(
    ows.scan((v0, v1) => Math.max(v0 + v1, 0), 0)
  )
  .pipeThrough(
    ows.distinct()
  )
  .pipeTo(
    ows.subscribe(
      v => console.log('Energy:', v)
    )
  );
```

## Documentation

[All exported functions are documented on JSR](https://jsr.io/@cloudydeno/stream-observables/doc).

The [Web Streams API has documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) for information on what the platform offers.

For those unfamiliar with Web Streams, try this [blog post](https://jakearchibald.com/2016/streams-ftw/) by [Jake Archibald](https://twitter.com/jaffathecake/) (he is aware the title hasn’t aged well).

---

License Apache 2.0
