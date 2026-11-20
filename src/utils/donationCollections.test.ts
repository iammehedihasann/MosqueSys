import { afterEach, describe, expect, it, vi } from "vitest";
import {
  applyDonationCollectionOverrides,
  monthKeyFromLabel,
  savedDonationCollectionsKey,
  saveDonationCollection,
} from "./donationCollections";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("donation collection overrides", () => {
  it("updates an existing month without adding a duplicate row", () => {
    const values = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
      dispatchEvent: vi.fn(),
    });

    const rows = [{ month: "নভেম্বর ২০২৬", collected: "1550", expense: "-", balance: "-" }];
    saveDonationCollection("2026-11", 2500);
    expect(monthKeyFromLabel("নভেম্বর ২০২৬")).toBe("2026-11");
    const updated = applyDonationCollectionOverrides(rows);

    expect(updated).toHaveLength(1);
    expect(updated[0].collected).toBe(2500);
    expect(JSON.parse(values.get(savedDonationCollectionsKey) ?? "{}")).toEqual({
      "2026-11": 2500,
    });
  });
});
