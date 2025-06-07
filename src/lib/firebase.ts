import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// User type definition
export interface FirebaseUser {
  uid: string;
  name: string;
  email: string;
}

// Post type definition
export interface Post {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: any;
  likes: number;
  replies: number;
  category: string;
  tags: string[];
  audioUrl?: string;
}

// Authentication functions
export const registerUser = async (email: string, password: string, name: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    const userProfile = {
      uid: user.uid,
      name,
      email
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    return userDoc.data() as FirebaseUser;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Post management functions
export const createPost = async (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'replies'>, audioFile?: File): Promise<string> => {
  try {
    let audioUrl = '';
    
    if (audioFile) {
      const storageRef = ref(storage, `post-audio/${Date.now()}-${audioFile.name}`);
      await uploadBytes(storageRef, audioFile);
      audioUrl = await getDownloadURL(storageRef);
    }

    const postData = {
      ...post,
      timestamp: serverTimestamp(),
      likes: 0,
      replies: 0,
      audioUrl
    };

    const docRef = await addDoc(collection(db, 'posts'), postData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};