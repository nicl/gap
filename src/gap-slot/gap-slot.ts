import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * A more specific version of gap-list. Loads slot info into the specified slot.
 * The slots API endpoint is expected to be a map of slot IDs to markup
 * (string).
 *
 * So unlike gap-list, no templating is supported here.
 *
 * However data is sent to the slots API with *config* - this is collected from
 * a global config object from the path specified on the `data-config-path
 * attribute`.
 */
const GapSlot: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const pathLookup = (obj: any, path: string): any => {
            for (
                var i = 0, segments = path.split("."), len = segments.length;
                i < len;
                i++
            ) {
                const found = obj[segments[i]];
                if (found) {
                    obj = found;
                } else {
                    console.log("path not found in window; " + path);
                    return {};
                }
            }
            return obj;
        };

        const src = el.attributes.getNamedItem("data-src");
        if (src === null) return;

        const slotID = el.attributes.getNamedItem("data-slot-id");
        if (slotID === null) return;

        const configPath = el.attributes.getNamedItem("data-config-path");
        if (configPath === null) return;

        const config = pathLookup(window, configPath.value);
        const jsonConfig = JSON.stringify(config);

        const urlEncodedConfig = encodeURIComponent(jsonConfig);

        const res = await helpers.fetch(
            src.value + "?config=" + urlEncodedConfig
        );
        const json = await res.json();
        const markup = json[slotID.value];

        if (markup) {
            el.innerHTML = markup;
        }
    }
};

export default GapSlot;

if (window.GAP) {
    window.GAP.registerElement("gap-slot", GapSlot);
}
