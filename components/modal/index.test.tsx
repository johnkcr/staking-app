/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

import Popup from "./index";

describe("Popup", () => {
  test("Confirmation Dialog render", () => {
    render(<Popup />);
    screen.debug();
    expect(screen.getByText("Swap successful")).toBeInTheDocument();
  });
});
