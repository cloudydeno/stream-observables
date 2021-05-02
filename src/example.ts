import * as ows from "./mod.ts";

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
