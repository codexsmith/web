import { expect, test, describe } from "vitest";
import {
  ATLAS_OVERVIEW_NODE_ID,
  parseMapState,
  serializeMapState,
  type MapState,
} from "./map-state";

describe("Map State Serialization", () => {
  const validNodes = ["identity", "boundary-theory", "distinction-space"];
  const isValidNode = (id: string) => validNodes.includes(id);

  test("parses default state from empty query", () => {
    const params = new URLSearchParams();
    const state = parseMapState(params, isValidNode);
    expect(state).toEqual({
      mode: "atlas",
      nodeId: ATLAS_OVERVIEW_NODE_ID,
      projection: "domains",
      relationId: null,
    });
  });

  test("parses valid focus state", () => {
    const params = new URLSearchParams(
      "mode=focus&node=boundary-theory&view=work",
    );
    const state = parseMapState(params, isValidNode);
    expect(state).toEqual({
      mode: "focus",
      nodeId: "boundary-theory",
      projection: "domains", // Focus mode always forces 'domains' projection
      relationId: null,
    });
  });

  test("parses valid halo state with relation", () => {
    const params = new URLSearchParams(
      "mode=halo&node=distinction-space&view=evidence&relation=some-relation-id",
    );
    const state = parseMapState(params, isValidNode);
    expect(state).toEqual({
      mode: "halo",
      nodeId: "distinction-space",
      projection: "evidence",
      relationId: "some-relation-id",
    });
  });

  test("falls back to atlas mode on invalid mode", () => {
    const params = new URLSearchParams("mode=invalid");
    const state = parseMapState(params, isValidNode);
    expect(state.mode).toBe("atlas");
  });

  test("falls back to the structural projection in atlas mode", () => {
    const params = new URLSearchParams("view=invalid");
    const state = parseMapState(params, isValidNode);
    expect(state.projection).toBe("domains");
  });

  test("keeps all, work, and evidence distinct in relation mode", () => {
    for (const projection of ["domains", "work", "evidence"] as const) {
      const state = parseMapState(
        new URLSearchParams(`mode=halo&node=identity&view=${projection}`),
        isValidNode,
      );
      expect(state.projection).toBe(projection);
    }
  });

  test("falls back to the Atlas overview on invalid node", () => {
    const params = new URLSearchParams("node=does-not-exist");
    const state = parseMapState(params, isValidNode);
    expect(state.nodeId).toBe(ATLAS_OVERVIEW_NODE_ID);
  });

  test("allows facet relation in focus mode", () => {
    const params = new URLSearchParams(
      "mode=focus&node=boundary-theory&relation=facet-boundary-theory-some-facet",
    );
    const state = parseMapState(params, isValidNode);
    expect(state.relationId).toBe("facet-boundary-theory-some-facet");
  });

  test("discards non-facet relation in focus mode", () => {
    const params = new URLSearchParams(
      "mode=focus&node=boundary-theory&relation=some-other-relation",
    );
    const state = parseMapState(params, isValidNode);
    expect(state.relationId).toBeNull();
  });

  test("serializes state correctly without relation", () => {
    const state: MapState = {
      mode: "atlas",
      nodeId: ATLAS_OVERVIEW_NODE_ID,
      projection: "domains",
      relationId: null,
    };
    const href = serializeMapState(state, "http://localhost/map?old=param");
    const url = new URL(href, "http://localhost");
    expect(url.pathname).toBe("/map");
    expect(url.searchParams.get("mode")).toBe("atlas");
    expect(url.searchParams.get("view")).toBe("domains");
    expect(url.searchParams.has("node")).toBe(false);
    expect(url.searchParams.has("relation")).toBe(false);
  });

  test("serializes state correctly with relation", () => {
    const state: MapState = {
      mode: "halo",
      nodeId: "boundary-theory",
      projection: "domains",
      relationId: "rel-123",
    };
    const href = serializeMapState(state, "http://localhost/map");
    const url = new URL(href, "http://localhost");
    expect(url.searchParams.get("relation")).toBe("rel-123");
  });

  test("serializes a selected facet without leaving focus mode", () => {
    const state: MapState = {
      mode: "focus",
      nodeId: "boundary-theory",
      projection: "work",
      relationId: "facet-boundary-theory-admissibility",
    };
    const href = serializeMapState(state, "http://localhost/map");
    const url = new URL(href, "http://localhost");
    expect(url.searchParams.get("mode")).toBe("focus");
    expect(url.searchParams.get("view")).toBe("domains");
    expect(url.searchParams.get("relation")).toBe(
      "facet-boundary-theory-admissibility",
    );
  });

  test("does not serialize a non-facet selection into focus mode", () => {
    const state: MapState = {
      mode: "focus",
      nodeId: "boundary-theory",
      projection: "domains",
      relationId: "some-other-relation",
    };
    const href = serializeMapState(state, "http://localhost/map");
    const url = new URL(href, "http://localhost");
    expect(url.searchParams.has("relation")).toBe(false);
  });

  test("does not leak a relation selection into the atlas", () => {
    const state: MapState = {
      mode: "atlas",
      nodeId: "boundary-theory",
      projection: "domains",
      relationId: "facet-boundary-theory-admissibility",
    };
    const href = serializeMapState(state, "http://localhost/map");
    const url = new URL(href, "http://localhost");
    expect(url.searchParams.get("view")).toBe("domains");
    expect(url.searchParams.has("relation")).toBe(false);
  });
});
