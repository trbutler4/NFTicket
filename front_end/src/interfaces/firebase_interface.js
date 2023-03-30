import { ref, get, child } from "firebase/database";
import { database } from "../firebase";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
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
  const storage = getStorage();
  const imageRef = storageRef(storage, `events/${eventId}/image.jpg`);
  await getDownloadURL(imageRef)
    .then((url) => {
      events[0].thumbnail = url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          console.log(error.code);
          break;
        case "storage/unauthorized":
          console.log(error.code);
          break;
        case "storage/canceled":
          console.log(error.code);
          break;
        case "storage/unknown":
          console.log(error.code);
          break;
        default:
          console.log(error.code);
          break;
      }
    });
  return events;
};

export const updateEvents = async () => {
  const cur_events = [];
  const lastEventId = await getLastEventId();
  console.log("last event id: " + lastEventId);
  for (let i = 0; i < lastEventId; i++) {
    const dbRef = ref(database);
    await get(child(dbRef, `events/${i}`)).then((snapshot) => {
      if (snapshot.exists()) {
        cur_events.push(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
    const storage = getStorage();
    const imageRef = storageRef(storage, `events/${i}/image.jpg`);
    await getDownloadURL(imageRef)
      .then((url) => {
        cur_events[i].thumbnail = url;
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log(error.code);
            break;
          case "storage/unauthorized":
            console.log(error.code);
            break;
          case "storage/canceled":
            console.log(error.code);
            break;
          case "storage/unknown":
            console.log(error.code);
            break;
          default:
            console.log(error.code);
            break;
        }
      });
  }

  return cur_events;
};
