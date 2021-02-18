import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { app } from "./Express/app";

export const api = functions.https.onRequest(app);

admin.initializeApp();

export const createUserInstance = functions.auth
  .user()
  .onCreate(async (user) => {
    functions.logger.log(
      `Welcome ${user.displayName}, Hope you have a good day`
    );
    await admin.firestore().collection("Users").add({
      displayName: user.displayName,
      email: user.email,
      favourites: [],
    });
  });
