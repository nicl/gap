import GapSlot from "./gap-slot";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-slot", () => {
    it("should inject the relevant slot", async () => {
        const globalAny: any = global;

        // Return component based on config
        globalAny.fetch = jest.fn(async (req: string) => {
            return {
                ok: true,
                json: () => ({ html: "<div>Foo</div>" })
            };
        });

        window.foo = {
            gapConfig: { IsContributor: true }
        };

        document.body.innerHTML = `<gap-slot id='test' data-src='example.json' />`;
        const el = document.getElementById("test");

        if (el === null) {
            fail();
            return;
        }

        await GapSlot.do(el as Element, defaultHelpers);
        expect(el.innerHTML).toBe("<div>Foo</div>");
    });
});
