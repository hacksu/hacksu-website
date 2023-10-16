import { ref } from "vue";

export const attemptedLogin = ref(false);
export const loggedIn = ref(false);

// if this script is running in the browser and not being pre-rendered on the
// server
if (typeof window !== "undefined"){
    fetch("/info").then(async res => {
        const text = await res.text();
        if (text){
            let info = "";
            try {
                info = JSON.parse(text);
            } catch {
                loggedIn.value = false;
            }
            if (!info || !info.isLeader){
                loggedIn.value = false;
            } else {
                loggedIn.value = true;
            }
            attemptedLogin.value = true;
        }
    });
}
