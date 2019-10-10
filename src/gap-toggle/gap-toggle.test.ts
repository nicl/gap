import GapToggle from "./gap-toggle";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-toggle", () => {
    it("should hide target on click", async () => {
        document.body.innerHTML = `<div id='target'>Foo</div><gap-display id='test' data-hide data-target='target'/>`;

        const el = document.getElementById("test");
        if (el === null) {
            fail();
            return;
        }

        await GapToggle.do(el as Element, defaultHelpers);
        el.click();

        const target = document.getElementById("target");
        expect(target.getAttribute("hidden")).toBe("true");
        expect(el.getAttribute("data-selected")).toBe("true");

        el.click(); // toggle back

        expect(target.getAttribute("hidden")).toBe(null);
        expect(el.getAttribute("data-selected")).toBe(null);
    });
});
