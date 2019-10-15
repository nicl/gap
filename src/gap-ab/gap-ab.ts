import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * Conditionally render one of two options based on presence of cookie.
 */
const GapAB: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const { flag } = helpers.getRequiredProps(el, ["flag"]);

        const tplA = helpers.getRequiredDomElement(
            el,
            "template[data-variant]"
        );
        const tplB = helpers.getRequiredDomElement(
            el,
            "template[data-control]"
        );

        // get state value
        const isOptedIn = helpers.getState(flag);

        if (isOptedIn) {
            const html = helpers.renderTemplate(tplA.innerHTML, {});
            el.innerHTML = html;
        } else {
            const html = helpers.renderTemplate(tplB.innerHTML, {});
            el.innerHTML = html;
        }
    }
};

export default GapAB;

if (window.GAP) {
    window.GAP.registerElement("gap-ab", GapAB);
}
