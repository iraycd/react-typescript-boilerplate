import "@testing-library/jest-dom/extend-expect";

import * as React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("Describe", () => {
  it("Initial test", () => {
    const testMessage = "Hello";
    const { getByText } = render(<App />);
    expect(getByText(testMessage)).toBeInTheDocument();
  });
});
