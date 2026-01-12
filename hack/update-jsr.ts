#!/usr/bin/env -S deno run --allow-read --allow-write=src/deno.json

import { expandGlob } from "@std/fs/expand-glob";

const contents = JSON.parse(await Deno.readTextFile('src/deno.json'));
contents.exports = await getExports();
await Deno.writeTextFile('src/deno.json', JSON.stringify(contents, null, 2) + '\n');

async function getExports(): Promise<Record<string, string>> {
  const exports: [string, string][] = [];

  const results = expandGlob("**/*.ts*", {
    root: 'src',
    includeDirs: false,
  });

  for await (const entry of results) {
    if (!entry) continue;
    if (entry.path.endsWith('/utils.ts')) continue;
    if (entry.path.endsWith('/example.ts')) continue;

    const path = `./${entry.path.slice(Deno.cwd().length+5)}`;
    const name = path.replace(/\.tsx?$/, '').replace(/\/mod$/, '');

    exports.push([name, path]);
  }

  exports.sort(([a], [b]) => a.localeCompare(b));

  return Object.fromEntries(exports);
}
