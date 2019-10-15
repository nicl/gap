import { Extension, GAPHelpers } from "../gap-core/gap-core";

/**
 * Mount a preact component and render
 */
const GapPreact: Extension = {
    do: async (el: Element, helpers: GAPHelpers): Promise<void> => {
        // take a src element as js which returns a preact component, which can then be mounted into the component
        const { src } = helpers.getRequiredProps(el, ["src"]);
        let done: Promise<void> = new Promise(() => {});

        const mount = () => {
            console.log("MOUNTING!");
            helpers.renderPreact(el, window.foo); // TODO foo is arbitrary here, we should use a UUID passed to src as a query param
            done = Promise.resolve();
        };

        console.log("CREATING SCRIPT, src is: " + src);
        const script = document.createElement("script");
        script.onload = mount;
        script.textContent =
            "const foo = () => { return 'foo' }; window.foo = foo;";
        document.body.append(script);

        return done;
    }
};

export default GapPreact;

if (window.GAP) {
    window.GAP.registerElement("gap-preact", GapPreact);
}
