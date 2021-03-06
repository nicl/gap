import Mustache from "mustache";

/**
 * This is the main loader for Gap.
 *
 * It exposes a GAP global. Extensions should register themselves on this using
 * GAP. E.g.
 *
 *     GAP.registerElement('gap-list', GapList)
 *
 * where gap-list is the tag name for the extension, and GapList is the
 * extension class.
 */

/**
 * A collection of GAP utilities. It is expected that extensions use these for
 * associated functionality. GAP is then free to optimise these over time, for
 * example to batch or cache API calls.
 *
 * But it is also useful to stub or mock these for testing purposes.
 */
export interface GAPHelpers {
    renderTemplate: (tpl: string, data: any) => string;
    fetch(input?: Request | string, init?: RequestInit): Promise<Response>;
    getState: (path: string) => string | null;
}

/**
 * **NOT RECOMMENDED FOR PRODUCTION USE.**
 *
 * GAP uses Mustache for templating. This is fast and lightweight, but does not
 * support data transformation. Coupled with the lack of custom Javascript in
 * GAP, this means data has to provided exactly as needed from the source API.
 * In practice, this is not always possible. And it is not desirable for quick
 * development and testing.
 *
 * To solve this problem, GAP allows registering of a proxy. This allows pattern
 * matching on requests, to transform data before it is returned from source.
 *
 * Register the proxy *after* gap-core but *before* other extensions.
 *
 * Transform functions have the potential to be very slow if operating on larger
 * data structures so care is needed.
 *
 * A core principle of GAP is to avoid custom client-side Javascript. As such,
 * use of Roxy in production is *strong discouraged*.
 */
let proxy: Proxy | null = null;
export interface Proxy {
    transform: (resp: Response) => Response;
}

export interface Extension {
    do: (el: Element, helpers: GAPHelpers) => Promise<void>;
}

export const defaultHelpers = {
    renderTemplate: (tpl: string, data: any) => {
        return Mustache.render(tpl, data, null, ["{{", "}}"]);
    },

    // Eventually this will cache/batch calls
    fetch: (
        input?: Request | string,
        init?: RequestInit
    ): Promise<Response> => {
        return fetch(input, init).then(r => {
            if (proxy) return proxy.transform(r);
            return r;
        });
    },

    // A way to access cookie values
    getState: (path: string): string | null => {
        // https://stackoverflow.com/a/15724300
        const value = "; " + document.cookie;
        const parts = value.split("; " + path + "=");

        if (parts.length == 2) {
            return parts
                .pop()
                .split(";")
                .shift();
        }

        return null;
    }
};

const GAP = {
    /**
     * Register your GAP extensions Extensions are created as custom elements,
     * so you will likely want to include a suitable polyfill on older browsers.
     * Fortunately these are not very large any more (< 15kb minified, or 5kb
     * minified and gzipped).
     */
    registerElement: (tag: string, extension: Extension) => {
        if (!customElements) {
            console.log(
                "GAP requires custom elements; please include a suitable polyfill"
            );
            return;
        }

        customElements.define(
            tag,
            class extends HTMLElement {
                constructor() {
                    super();
                    extension.do(this, defaultHelpers);
                }
            }
        );
    },
    // See gap-proxy readme for info. NOT RECOMMENDED FOR PRODUCTION.
    registerProxy: (prox: Proxy) => (proxy = prox)
};

window.GAP = GAP;
