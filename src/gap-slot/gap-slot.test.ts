import GapSlot from "./gap-slot";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-slot", () => {
    it("should inject the relevant slot", async () => {
        const globalAny: any = global;
        globalAny.fetch = jest.fn(async (req: string) => {
            const queryParams = req.split("?")[1];
            const json = new URLSearchParams(queryParams).get("config");
            const config = JSON.parse(json);
            const isContributor = config && config.IsContributor;
            const slotAComponent = isContributor
                ? "<div>Contributed</div>"
                : "<div>Not contributed</div>";

            return {
                ok: true,
                json: () => ({ slotA: slotAComponent })
            };
        });

        window.gapConfig = {
            IsContributor: true
        };

        document.body.innerHTML = `<gap-slot id='test' data-src='example.json' data-slot-id='slotA' data-config-path="gapConfig" />`;
        const el = document.getElementById("test");

        if (el === null) {
            fail();
            return;
        }

        await GapSlot.do(el as Element, defaultHelpers);
        expect(el.innerHTML).toBe("<div>Contributed</div>");
    });
});
