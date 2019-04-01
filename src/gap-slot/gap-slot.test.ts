import GapSlot from "./gap-slot";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-slot", () => {
    it("should inject the relevant slot", async () => {
        const globalAny: any = global;
        const resp = {
            ok: true,
            json: () => ({ slotA: "<div>Foo</div>", slotB: "bar" })
        };
        globalAny.fetch = jest.fn(async () => resp);
        document.body.innerHTML = `<gap-slot id='test' data-src='example.json' data-slot-id='slotA' />`;
        const el = document.getElementById("test");

        if (el === null) {
            fail();
            return;
        }

        await GapSlot.do(el as Element, defaultHelpers);
        expect(el.innerHTML).toBe("<div>Foo</div>");
    });
});
