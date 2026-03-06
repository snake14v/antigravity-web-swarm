import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDoc, where, getDocs, limit } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBo0RhMJ152NdEXcbpOvM6yzwivnCdQXi4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oorulogix-e2dc4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oorulogix-e2dc4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oorulogix-e2dc4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "220616346924",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:220616346924:web:56d4059f82fb0d71c93089",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PPNHPCQSTB"
};

let app;
let db: any;
let auth: any;
let analytics: any;

// Exportable functions that can be mocked
let _onAuthStateChanged = onAuthStateChanged;
let _signInWithEmailAndPassword = signInWithEmailAndPassword;
let _createUserWithEmailAndPassword = createUserWithEmailAndPassword;
let _signOut = signOut;
let _signInWithPopup = signInWithPopup;
let _googleAuthProvider = new GoogleAuthProvider();

let _collection = collection;
let _addDoc = addDoc;
let _serverTimestamp = serverTimestamp;
let _query = query;
let _orderBy = orderBy;
let _onSnapshot = onSnapshot;
let _doc = doc;
let _updateDoc = updateDoc;
let _deleteDoc = deleteDoc;
let _setDoc = setDoc;
let _getDoc = getDoc;
let _where = where;
let _getDocs = getDocs;
let _limit = limit;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
} catch (error) {
  console.error("Firebase initialization error", error);
  // Mock implementations for when Firebase fails to initialize
  db = {} as any;
  auth = {} as any;
  
  _onAuthStateChanged = ((auth: any, cb: any) => { cb(null); return () => {}; }) as any;
  _signInWithEmailAndPassword = (async () => { throw new Error("Firebase not configured"); }) as any;
  _createUserWithEmailAndPassword = (async () => { throw new Error("Firebase not configured"); }) as any;
  _signOut = (async () => {}) as any;
  _signInWithPopup = (async () => { throw new Error("Firebase not configured"); }) as any;
  
  _collection = (() => {}) as any;
  _addDoc = (async () => {}) as any;
  _serverTimestamp = (() => {}) as any;
  _query = (() => {}) as any;
  _orderBy = (() => {}) as any;
  _onSnapshot = (() => () => {}) as any;
  _doc = (() => {}) as any;
  _updateDoc = (async () => {}) as any;
  _deleteDoc = (async () => {}) as any;
  _setDoc = (async () => {}) as any;
  _getDoc = (async () => ({ exists: () => false, data: () => ({}) })) as any;
  _where = (() => {}) as any;
  _getDocs = (async () => ({ empty: true, docs: [] })) as any;
  _limit = (() => {}) as any;
}

export { 
  db, 
  auth, 
  analytics,
  _onAuthStateChanged as onAuthStateChanged,
  _signInWithEmailAndPassword as signInWithEmailAndPassword,
  _createUserWithEmailAndPassword as createUserWithEmailAndPassword,
  _signOut as signOut,
  _signInWithPopup as signInWithPopup,
  _googleAuthProvider as googleAuthProvider,
  _collection as collection,
  _addDoc as addDoc,
  _serverTimestamp as serverTimestamp,
  _query as query,
  _orderBy as orderBy,
  _onSnapshot as onSnapshot,
  _doc as doc,
  _updateDoc as updateDoc,
  _deleteDoc as deleteDoc,
  _setDoc as setDoc,
  _getDoc as getDoc,
  _where as where,
  _getDocs as getDocs,
  _limit as limit
};
