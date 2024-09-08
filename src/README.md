This module is a Deno-friendly port
of [observables-with-streams](https://github.com/surma/observables-with-streams).

It is published to JSR.io as `@cloudydeno/stream-observables`.

Subset of original README below:

# Observables with Streams

A library for observables built with [WHATWG streams](https://streams.spec.whatwg.org).
This library is inspired by [ReactiveX’s operators](http://reactivex.io/documentation/operators.html)
and implements a subset of them using [streams](https://streams.spec.whatwg.org).

The goal of this library is to implement observables making as much use of the platform as possible and being highly tree-shakeable.

## Example

```typescript
import * as ows from "jsr:@cloudydeno/stream-observables@^1.0.0";

console.log('Tap Enter to add energy!');
ows.merge(
  ows.fromTimer(500)
    .pipeThrough(ows.map(() => -1)),
  ows.fromDenoReader(Deno.stdin)
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

The (somewhat lacking) documentation for the original library is hosted at https://observables-with-streams.surma.technology

## Caveats

For a good primer about streams, read this [blog post](https://jakearchibald.com/2016/streams-ftw/) by [Jake Archibald](https://twitter.com/jaffathecake/) (he is aware the title hasn’t aged well).

---

License Apache 2.0
