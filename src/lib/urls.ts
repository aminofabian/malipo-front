/** Public Connect app — merchant signup / console entry. */
export const CONNECT_ORIGIN = "https://connect.kioskpay.co.ke";

export const CONNECT_SIGNIN = `${CONNECT_ORIGIN}/signin`;
export const CONNECT_SIGNUP = `${CONNECT_ORIGIN}/signup`;

/** WordPress plugin release, served from the site root (source: malipo-wordpress). */
export const PLUGIN_VERSION = "0.1.3";
// The ?v= cache-buster gives each release a fresh CDN/browser cache key, so a
// stale cached response for a previous URL can never shadow the current file.
export const PLUGIN_ZIP = `/malipo-payments-${PLUGIN_VERSION}.zip?v=${PLUGIN_VERSION}`;
