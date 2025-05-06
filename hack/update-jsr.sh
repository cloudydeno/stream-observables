#!/bin/sh -eux
cd src

deno run \
  --allow-read=. \
  --allow-write=jsr.json \
  https://raw.githubusercontent.com/oscarotero/jsr-pub/4d1ef6e25b02fc26551fa7e5d29bbdc5e9884050/mod.ts \
  --name "$(jq -r .name < jsr.json)" \
  --version "$(jq -r .version < jsr.json)"
