import { Config } from "@remotion/cli/config";

Config.setEntryPoint("src/video/index.tsx");
Config.setStudioPort(3001);
Config.setPublicDir("public");

// Headless Chrome crashes on this Mac (SEGV). Use browser-based rendering instead.
Config.setExperimentalClientSideRenderingEnabled(true);
Config.setAllowHtmlInCanvasEnabled(true);
