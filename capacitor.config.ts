import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "mtko.itdev.asia",
    appName: "mtkoApp",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
    plugins: {
        GoogleAuth: {
            scopes: ["profile", "email"],
            serverClientId:
                "537737760177-baleph0vkk04pdkdch8jaj74k0a73rdi.apps.googleusercontent.com",
            forceCodeForRefreshToken: true,
        },
    },
};

export default config;
