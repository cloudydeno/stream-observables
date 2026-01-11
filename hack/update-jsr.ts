#!/usr/bin/env -S deno run --allow-read --allow-write=src/deno.json

import { expandGlob } from "@std/fs/expand-glob";

const contents = JSON.parse(await Deno.readTextFile('src/deno.json'));
contents.exports = await getExports("**/*.ts*");
await Deno.writeTextFile('src/deno.json', JSON.stringify(contents, null, 2) + '\n');

async function getExports(pathPattern: string): Promise<Record<string, string>> {
  const exports: [string, string][] = [];

  const results = expandGlob(pathPattern, {
    root: 'src',
    includeDirs: false,
  });

  for await (const entry of results) {
    if (!entry) continue;
    const path = `./${entry.path.slice(Deno.cwd().length+5)}`;
    const name = path;//.replace(/\.tsx?$/, '');

    exports.push([name, path]);

    if (name == './mod.ts') {
      exports.push([".", path]);
    }
  }

  exports.sort(([a], [b]) => a.localeCompare(b));

  return Object.fromEntries(exports);
}
