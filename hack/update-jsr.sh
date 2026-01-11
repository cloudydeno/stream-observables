#!/bin/sh -eux
cd src

deno run \
  --allow-read=. \
  --allow-write=deno.json \
  https://raw.githubusercontent.com/oscarotero/jsr-pub/4d1ef6e25b02fc26551fa7e5d29bbdc5e9884050/mod.ts \
  --name "$(jq -r .name < deno.json)" \
  --version "$(jq -r .version < deno.json)"
