import { initializeApp, getApps, cert } from "firebase-admin/app";

var serviceAccount = require("../credentials.json");

// configuration for firebase admin
const firebaseAdminConfig = {
  credential: cert(serviceAccount),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
