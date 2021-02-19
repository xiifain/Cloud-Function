import * as express from "express";
import * as admin from "firebase-admin";

export const app = express();

app.get("/getAllUsers", (_, response) => {
  admin
    .auth().listUsers()
    .then((users) => {
      response.json(users);
    })
    .catch((error) => {
      console.log(`Error listing users:`, error);
      response.sendStatus(503);
    });
});

app.post("/product", async (request, response) => {

  await admin.firestore().collection("Products").add(request.body);
  response.sendStatus(200);
});

app.get("/product/:productName", async (request, response) => {
  try {
    const { productName } = request.params;

    const snapshot = await admin
      .firestore()
      .collection("Products")
      .where("name", "==", productName)
      .get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      response.sendStatus(404);
      return;
    }
    var something: FirebaseFirestore.DocumentData[] = [];
    snapshot.forEach((doc) => {
      something.push(doc.data());
    });
    response.json(something);
  } catch (error) {
    console.log(error);
    response.sendStatus(503);
  }
});

app.get("/product", async (_, response) => {
  try {
    const snapshot = await admin.firestore().collection("Products").get();

    if (snapshot.empty) {
      console.log("No Matching Documents.");
      response.sendStatus(404);
      return;
    }
    var something: FirebaseFirestore.DocumentData[] = [];

    snapshot.forEach((doc) => {
      something.push(doc.data());
    });
    response.json(something);
  } catch (error) {
    console.log(error);
    response.sendStatus(503);
  }
});
