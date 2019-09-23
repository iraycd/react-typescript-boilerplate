it("renders index.tsx without crashing", async () => {
  const div = document.createElement("div");
  div.id = "root";
  document.documentElement.appendChild(div);
  await require("../index");
  expect(div).toBeInstanceOf(HTMLElement);
});
