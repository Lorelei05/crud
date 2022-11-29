// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoDPngLaZ40UYgH84A4PU9RgJT8J_-i3I",
  authDomain: "friendlychat-20c4e.firebaseapp.com",
  projectId: "friendlychat-20c4e",
  storageBucket: "friendlychat-20c4e.appspot.com",
  messagingSenderId: "935079116078",
  appId: "1:935079116078:web:764c0f4f5b0c008fe90ebf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage(app);

export const saveTask = (title, description, imageUrl) => addDoc(collection(db, 'tasks'), { title, description, imageUrl });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  console.log(file);
  const storageRef = ref(storage, `imagenes/${file.name}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   document.querySelector('#progress').value = progress;
    },
    (error) => {
        
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        document.querySelector('#image').src = downloadURL;
        console.log('File available at', downloadURL);
        });
    }
    );

  }


