import * as _functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(_functions.config().firebase);

export const db = admin.firestore();
export const functions = _functions.region("asia-northeast1");
export default admin;
