import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

// TODO: get this working with webpack

export const getEvents = async (lastEventId) => {

    for (let i = 1; i <= lastEventId; i++) {
        const eventRef = ref(database, "events/" + i);
        onValue(eventRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }

}
