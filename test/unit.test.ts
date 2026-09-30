import { add, greet } from "../src/app";

test("add sums two numbers", () => expect(add(2, 3)).toBe(5));
test("greet formats a name", () => expect(greet("Nikhil")).toBe("hello, Nikhil"));
