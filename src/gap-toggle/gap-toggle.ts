import { Extension, GAPHelpers } from "../gap-core/gap-core";

var activated = false;

/**
 * A somewhat special extension that provides some simple display behaviour
 *
 * Sets the 'hidden' attribute on the target element, so you will need to
 * include some CSS to make this work. E.g. something like:
 *
 * [hidden] { display: none !important; }
 *
 * The gap-toggle element itself has a data-selected (boolean) attribute set to
 * allow styling that based on state as well.
 */
const GapToggle: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const toggle = (el: Element, attr: string): void => {
            if (el.hasAttribute(attr)) {
                el.removeAttribute(attr);
            } else {
                el.setAttribute(attr, "true");
            }
        };

        const targetID = el.attributes.getNamedItem("data-target");
        if (targetID === null) return;

        const shouldHide = el.attributes.getNamedItem("data-hide");

        const target = document.getElementById(targetID.value);
        if (target === null) return;

        // TODO - likely that click isn't great for mobile so should refine
        el.addEventListener("click", () => {
            if (!activated) {
                if (shouldHide) {
                    target.setAttribute("hidden", "true");
                } else {
                    target.removeAttribute("hidden");
                }

                el.setAttribute("data-selected", "true");
                activated = true;
                return;
            }

            // if already activated, simply toggle stuff
            toggle(el, "data-selected");
            toggle(target, "hidden");
        });
    }
};

export default GapToggle;

if (window.GAP) {
    window.GAP.registerElement("gap-toggle", GapToggle);
}
