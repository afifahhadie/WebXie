import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hexagon } from "./Hexagon";

describe("Hexagon", () => {
  it("renders its children inside the hexagon frame", () => {
    render(
      <Hexagon>
        <span>icon</span>
      </Hexagon>
    );
    expect(screen.getByText("icon")).toBeInTheDocument();
  });
});
