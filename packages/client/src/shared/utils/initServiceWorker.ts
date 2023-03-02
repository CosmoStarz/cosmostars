export function initServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/serviceWorker.ts").then((registration) => {
                console.log(`Service Worker registered in ${registration.scope}`);
            }).catch((error) => console.log(`Service Worker registretion failed. ${error}`));
        });
    } else {
        console.log("Your browser doesn`t support Service Worker :(")
    }
}
