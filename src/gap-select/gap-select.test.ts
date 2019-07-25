import GapSelect from "./gap-select";
import { defaultHelpers } from "../gap-core/gap-core";

describe("gap-select", () => {
    it("should select an option", async () => {
        document.body.innerHTML = `
<gap-select id='test'>
    <div id="option1" data-selected='true' data-option>Foo></div>
    <div id="option2" data-option>Foo></div>
</gap-select>
`;

        const el = document.getElementById("test");
        if (el === null) {
            fail();
            return;
        }

        await GapSelect.do(el as Element, defaultHelpers);

        const selectedOption = document.getElementById("option1");
        const unselectedOption = document.getElementById("option2");

        unselectedOption.click();

        expect(unselectedOption.getAttribute("data-selected")).toBe("true");
        expect(selectedOption.getAttribute("data-selected")).toBe("false");
    });
});
