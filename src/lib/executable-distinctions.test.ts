import { describe, expect, it } from "vitest";
import {
  EXECUTABLE_DISTINCTIONS_PATH,
  executableDistinctions,
  validateExecutableDistinctions,
  type ExecutableDistinctionsArgument,
} from "./executable-distinctions";

describe("executable-distinctions public argument", () => {
  it("distinguishes token, semantic, and operational layers", () => {
    expect(executableDistinctions.layers.map((layer) => layer.id)).toEqual([
      "token",
      "semantic",
      "operational",
    ]);
  });

  it("carries authority through consequence into repair", () => {
    expect(executableDistinctions.consequencePath).toEqual(
      expect.arrayContaining([
        "interpreter or procedure",
        "authorized operation",
        "state transition",
        "consequence",
        "contestability and repair",
      ]),
    );
  });

  it("uses one stable essay route", () => {
    expect(EXECUTABLE_DISTINCTIONS_PATH).toBe(
      "/artifact/executable-distinctions",
    );
  });

  it("rejects a path that ends before repair", () => {
    const incomplete = {
      ...executableDistinctions,
      consequencePath: executableDistinctions.consequencePath.filter(
        (step) => step !== "contestability and repair",
      ),
    } as ExecutableDistinctionsArgument;

    expect(() => validateExecutableDistinctions(incomplete)).toThrow(
      /contestability and repair/i,
    );
  });
});
