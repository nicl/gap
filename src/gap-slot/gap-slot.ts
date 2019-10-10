import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * A simpler version of gap-list that removes the templating.
 */
const GapSlot: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const src = el.attributes.getNamedItem("data-src");
        if (src === null) return;

        const res = await helpers.fetch(src.value);
        const json = await res.json();
        const markup = json.html;

        if (markup) {
            el.innerHTML = markup;
        }
    }
};

export default GapSlot;

if (window.GAP) {
    window.GAP.registerElement("gap-slot", GapSlot);
}
