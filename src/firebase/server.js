import admin from 'firebase-admin';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = {
    "type": "service_account",
    "project_id": "niche-spark",
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40niche-spark.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

let firestoreDb;
const currentApps = getApps();
if (!currentApps.length) {
    const app = initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    firestoreDb = getFirestore(app);
}else{
    const app = currentApps[0];
    firestoreDb = getFirestore(app);
}

export { firestoreDb };