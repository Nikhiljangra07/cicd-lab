// Intentionally NOT hermetic: it depends on something outside the repo.
// It passes on a machine where this variable is set and fails everywhere else.
// Lesson 1 is about what happens to a test like this in CI.
test("release channel is configured", () => {
  expect(process.env.RELEASE_CHANNEL).toBe("lab");
});
