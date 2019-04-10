import GapDisplay from "./gap-display";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-list", () => {
    it("should hide target on click", async () => {
        document.body.innerHTML = `<div id='target'>Foo</div><gap-display id='test' data-hide data-target='target'/>`;

        const el = document.getElementById("test");
        if (el === null) {
            fail();
            return;
        }

        await GapDisplay.do(el as Element, defaultHelpers);
        el.click();

        const target = document.getElementById("target");
        expect(target.getAttribute("hidden")).toBe("true");
    });
});
