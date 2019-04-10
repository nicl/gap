import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * A somewhat special extension that provides some simple display behaviour
 *
 * Note, this only sets the 'hidden' attribute on the target element, so you
 * will need to include some CSS to make this work. E.g. something like:
 *
 * [hidden] {
 *   display: none !important;
 * }
 */
const GapDisplay: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const targetID = el.attributes.getNamedItem("data-target");
        if (targetID === null) return;

        const shouldHide = el.attributes.getNamedItem("data-hide");

        const target = document.getElementById(targetID.value);
        if (target === null) return;

        // TODO - likely that click isn't great for mobile so should refine
        el.addEventListener("click", () => {
            if (shouldHide) {
                target.setAttribute("hidden", "true");
            } else {
                target.setAttribute("hidden", "false");
            }
        });
    }
};

export default GapDisplay;

if (window.GAP) {
    window.GAP.registerElement("gap-display", GapDisplay);
}
