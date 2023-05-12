import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "tko.itdev.asia",
    appName: "tkoApp",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
};

export default config;
