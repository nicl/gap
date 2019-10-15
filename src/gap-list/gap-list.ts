import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * Loads JSON content from a CORS endpoint and renders it through a provided
 * template.
 */
const GapList: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const { src } = helpers.getRequiredProps(el, ["src"]);
        const tpl = helpers.getRequiredDomElement(el, "template");

        const res = await helpers.fetch(src);
        const json = await res.json();
        const html = helpers.renderTemplate(tpl.innerHTML, json);

        el.innerHTML = html;
    }
};

export default GapList;

if (window.GAP) {
    window.GAP.registerElement("gap-list", GapList);
}
