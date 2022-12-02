const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCustomToken } = require('firebase/auth');
const firebaseConfig = {
    apiKey: "AIzaSyClBRTKp0rzdw0-aPlR-KkOBEq8CovsELs",
    authDomain: "crypto-swap-e608e.firebaseapp.com",
    //The value of `databaseURL` depends on the location of the database
    //databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "crypto-swap-e608e",
    //storageBucket: "crypto-swap-e608e.appspot.com",
    //messagingSenderId: "SENDER_ID",
    appId: "crypto-swap-e608e",
    //For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

async function test() {
    signInWithCustomToken(auth, "eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTY2OTcxMTc3NywiaWF0IjoxNjY5NzA4MTc3LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0yNnE0c0BjcnlwdG8tc3dhcC1lNjA4ZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLTI2cTRzQGNyeXB0by1zd2FwLWU2MDhlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiMzNmOGJmMjEtMDBmOS00ZGE3LTk4NDEtMjJjZjhhNzc5Nzg1In0.K8SPa-VzYwlsidXW-cczKMlL19puLf1XmNK-P4fE_yzaW0VixuPlPiNG7zV97P8GJ0GrI9yR285_2rS358gnSus4kkv3sgeX1pYZn63mfL0VVWYqmXPzoAkyRHYVi9edSPdNxVVQZdfVkvrUv20BExx1uw3a2_6CdTBh0TYLigfareVjpNQKQFErbrTKvlcpC9DR_ltFMWQ-F1Bdp1HnI10KcAsk_GPZDArNpoPVUZLehSvT7z12ix9dO0qtvB4mHGQ7nMCtStJ3EJYYAeQFmLK3z-L2uHFkeVQam8_61y-o2N3wKiRKLLA_zCDr5llozAWOTqukhp64a_FXBCv70Q")
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.phoneNumber);
        console.log(user.uid);
        console.log(auth.currentUser.getIdToken(true).then((token) => {
            console.log(token);
        }).catch((error) => {
            console.log(error);
        }));
    })
    .catch((error) => {
        console.log(error.code);
    });
};

test();
