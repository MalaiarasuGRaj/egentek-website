import { createStart } from "@tanstack/react-start";

// Start instance with no custom middleware: the app is a static front end.
// The generated route types read this export to register the router config.
export const startInstance = createStart(() => ({}));
