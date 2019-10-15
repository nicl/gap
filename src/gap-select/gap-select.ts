import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * A set of elements can be marked as 'options' and then one can be 'selected',
 * which just means a 'data-selected' attribute is added to it. CSS can then be
 * used to leverage this for styling/behaviour.
 *
 * Options are added as elements with a 'data-option' attribute that are *direct
 * children* of the gap-select element.
 */
const GapSelect: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const options = helpers.getRequiredDomElements(el, "[data-option]");

        options.forEach(el => {
            el.addEventListener("click", () => {
                options.forEach(option => {
                    option.setAttribute(
                        "data-selected",
                        option.isEqualNode(el) ? "true" : "false"
                    );
                });
            });
        });
    }
};

export default GapSelect;

if (window.GAP) {
    window.GAP.registerElement("gap-select", GapSelect);
}
