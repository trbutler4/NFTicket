import { ref, get, child } from "firebase/database";
import { database } from "../firebase";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { getLastEventId } from "./NFTicket_interface";

export const getEvents = async (lastEventId) => {
  const cur_events = [];
  console.log("last event id: " + lastEventId);
  for (let i = 0; i < lastEventId; i++) {
    const dbRef = ref(database);
    return get(child(dbRef, `events/${i}`)).then((snapshot) => {
      if (snapshot.exists()) {
        cur_events.push(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }
  return cur_events;
};

export const getEventInfo = async (eventId) => {
  const dbRef = ref(database);
  const events = [];
  await get(child(dbRef, `events/${eventId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        events.push(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return events[0];
};

export const updateEvents = async () => {
  const cur_events = [];
  const lastEventId = await getLastEventId();
  console.log("last event id: " + lastEventId);
  for (let i = 1; i <= lastEventId; i++) {
    const dbRef = ref(database);
    await get(child(dbRef, `events/${i}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const event = snapshot.val();
        cur_events.push(event);
      } else {
        console.log("No data available");
      }
    });
  }
  return cur_events;
};

export const getEventImageUrl = async (eventId) => {
    const storage = getStorage();
    return await getDownloadURL(storageRef(storage, `events/${eventId}/image.jpg`))
};

export const uploadMetadata = async (id, metadata) => {
    const storage = getStorage();
    const metadataRef = storageRef(storage, `metadata/${id}.json`);

    // convert object into json string
    const metadataString = JSON.stringify(metadata);

    // create blob from json string
    const blob = new Blob([metadataString], {type: "application/json"});

    // upload blob to firebase storage
    await uploadBytes(metadataRef, blob);

}

