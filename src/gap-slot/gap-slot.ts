import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * A more specific version of gap-list. Loads slot info into the specified slot.
 * The slots API endpoint is expected to be a map of slot IDs to markup
 * (string).
 *
 * So unlike gap-list, no templating is supported here.
 *
 * However data is sent to the slots API with *config* - this is collected from
 * the global.gap.config object.
 */
const GapSlot: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const src = el.attributes.getNamedItem("data-src");
        if (src === null) return;

        const slotID = el.attributes.getNamedItem("data-slot-id");
        if (slotID === null) return;

        const configObject = el.attributes.getNamedItem("data-config-object");
        if (configObject === null) return;

        const jsonConfig = JSON.stringify(window[configObject.value]);
        const urlEncodedConfig = encodeURIComponent(jsonConfig);

        const res = await helpers.fetch(
            src.value + "?config=" + urlEncodedConfig
        );
        const json = await res.json();
        const markup = json[slotID.value];
        el.innerHTML = markup;
    }
};

export default GapSlot;

if (window.GAP) {
    window.GAP.registerElement("gap-slot", GapSlot);
}
