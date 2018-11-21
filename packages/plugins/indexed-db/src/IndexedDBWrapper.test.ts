import { IndexedDBWrapper } from "./IndexedDBWrapper";
const { reset } = require("shelving-mock-indexeddb");

// Reset the IndexedDB mock before/after tests.
// This will clear all object stores, indexes, and data.
beforeEach(() => reset());
afterEach(() => reset());

// The IndexedDB mock uses setTimeout() to simulate the asyncronous API.
// Add fake timers before/after tests to ensure the asyncronous responses are received by the test.
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.runAllTimers());

describe("@gondel/plugin-indexed-db", () => {
  describe("IndexedDBWrapper", () => {
    it("should create a connection", async done => {
      expect.assertions(0);
      const db = new IndexedDBWrapper("testCase1");
      await db.connect();
      expect(db).toMatchSnapshot();
      expect(db.__dangerouslyAccessInternalDatabase()).toMatchSnapshot();
      done();
    });

    it(
      "should set/get values from the DB",
      async done => {
        expect.assertions(3);
        const db = new IndexedDBWrapper("testCase2");
        await db.connect();
        expect(db).toMatchSnapshot();
        expect(db.__dangerouslyAccessInternalDatabase()).toMatchSnapshot();

        await db.set({
          id: "1",
          value: "Hello World"
        });
        expect(db).toMatchSnapshot();
        expect(db.__dangerouslyAccessInternalDatabase()).toMatchSnapshot();

        const result = await db.get<{ value: string }>("1");
        expect(result.value).toEqual("Hello World");
        expect(db).toMatchSnapshot();
        expect(db.__dangerouslyAccessInternalDatabase()).toMatchSnapshot();
        done();
      },
      15000
    );
  });
});
