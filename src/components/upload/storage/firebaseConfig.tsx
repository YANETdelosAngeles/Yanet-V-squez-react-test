import { initializeApp} from "firebase/app";
import { getStorage, ref, uploadBytes, listAll,getDownloadURL} from 'firebase/storage';
import uuid from 'react-uuid';

const firebaseConfig = {
  apiKey: "AIzaSyBry_D883LlruK805mYNrvTek-8oo7Py2c",
  authDomain: "imagenesproyectoreactcrud.firebaseapp.com",
  projectId: "imagenesproyectoreactcrud",
  storageBucket: "imagenesproyectoreactcrud.appspot.com",
  messagingSenderId: "365855044097",
  appId: "1:365855044097:web:79cbef1f3ad24dab2f8600",
  measurementId: "G-QSQX3N1ZS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


export const upload=(file:File)=>{
    const storageRef = ref(storage, uuid())
    uploadBytes(storageRef, file).then((snapshot) => {
        try {
            console.info('Imagen cargada correctamente')
        } catch (error) {
            console.error('Error al cargar la imagen  ', file.name);
        }
    });
}

export const fetchImages = async (folder:string) => {
    const storageRef = await ref(storage, folder);
    const result = await listAll(storageRef);
  
    const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  
    return Promise.all(urlPromises);
};