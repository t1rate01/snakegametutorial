import { initializeApp, getApps } from 'firebase/app';
import 'firebase/database';

// LISÄÄ PALAUTUS TXT TIEDOSTON CONFIG TÄMÄN KOMMENTIN ALLE JA KATSO ALEMPI KOMMENTTI











if (!getApps().length) {
    initializeApp(firebaseConfig);
} 

export { firebaseConfig };


// !!!OPETTAJA!!!
// kirjoitin readmehen väärin
// siitä puuttui databaseURL: 
// databaseURL: "https://snakegame-tjr-default-rtdb.europe-west1.firebasedatabase.app/"


// jouduin myös ajamaan npx expo install --fix  että lähti toimimaan
// kokeilin myös npm install @types/firebase
// ja npm install firebase, otti itsellä molemmat toimiakseen
// jos ei siis toimi perus npm install jälkeen tämä appi
