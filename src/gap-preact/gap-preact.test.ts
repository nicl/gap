import GapPreact from "./gap-preact";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-preact", () => {
    it("should mount a preact component", async () => {
        const globalAny: any = global;

        // Return component based on config
        globalAny.fetch = jest.fn(async (req: string) => {
            console.log("FOo" + req);

            return {
                ok: true,
                text: () => "const foo = () => 'foo'; window.foo = foo;"
            };
        });

        document.body.innerHTML = `<gap-preact id='test' data-src='example.js' />`;
        const el = document.getElementById("test");

        if (el === null) {
            fail();
            return;
        }

        await GapPreact.do(el as Element, defaultHelpers);
        expect(el.innerHTML).toBe("foo");
    });
});
