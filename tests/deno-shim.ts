import {
  assert,
  assertEquals, assertStrictEquals,
  assertThrows, assertStringIncludes,
} from "https://deno.land/std@0.105.0/testing/asserts.ts";

const suiteStack = new Array<string>();

type TestCallback = (failureText?: string) => void;
export const Mocha = {

  describe(label: string, func: () => void) {
    suiteStack.push(label);
    func();
    suiteStack.pop();
  },

  it(label: string, func: (done: TestCallback) => void | Promise<void>) {
    Deno.test([...suiteStack, label].join(' / '), async () => {
      if (func.length > 0) {
        const failureText = await new Promise(func);
        assert(failureText == null, failureText);
      } else {
        await func(() => {});
      }
    });
  },

};

export const chai = {

  expect(actual: any) {
    return {
      get to() { return this; },
      get have() { return this; },
      get deep() { return this },

      equal(expected: any) {
        assertEquals(actual, expected);
      },

      length(expected: number) {
        if (!Array.isArray(actual)) throw new Error(
          `what is non-Array length?`);
        assertEquals(actual.length, expected);
      },

    };
  }

}
