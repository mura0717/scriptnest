import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createFirebaseApp } from "../config/firebaseServerConfig.js";
import admin from "../config/firebaseAdmin.js";

const ideaServices = {
  getIdea: async (userId) => {},

  getAllIdeas: async () => {},

  /* export const createUser = async (userData) => {
   
  } */

  editIdea: async (userId) => {},

  deleteIdea: async (userId) => {},
};

export default ideaServices;