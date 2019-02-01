import { Extension, GAPHelpers } from '../gap-core/gap-core';

/**
 * Conditionally render one of two options based on presence of cookie.
 */
const GapAB: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        const path = el.attributes.getNamedItem('data-flag').value;
        
        if (path === null) return;

        const tplA = el.querySelector('template[data-variant]');
        const tplB = el.querySelector('template[data-control]');
        if (tplA === null || tplB === null) return;

        // get state value
        const isOptedIn = helpers.getState(path);

        if (isOptedIn) {
            const html = helpers.renderTemplate(tplA.innerHTML, {});
            el.innerHTML = html;
        } else {
            const html = helpers.renderTemplate(tplB.innerHTML, {});
            el.innerHTML = html;            
        }
    },
};

export default GapAB;

if (window.GAP) {
    window.GAP.registerElement('gap-ab', GapAB);
}