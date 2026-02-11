const fs = require("fs");
const path = require("path");
const { getAll, getById, add, remove } = require("../public/app");

const dbPath = path.join(__dirname, "../data/tasks.json");


// Clear the database before each test
beforeEach(() => {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
});

test("getAll returns empty array", async () => {
  expect(await getAll()).toEqual([]);
});

test("add task", async () => {
  const task = await add("My task");
  expect(task.title).toBe("My task");
  expect((await getAll()).length).toBe(1);
});

test("getById returns correct task", async () => {
  const task = await add("Find me");
  const found = await getById(task.id);
  expect(found.title).toBe("Find me");
});

test("remove task", async () => {
  const task = await add("Delete me");
  const tasks = await remove(task.id);
  expect(tasks.length).toBe(0);
});
