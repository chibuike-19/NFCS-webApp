'use server'

import {auth} from 'firebase-admin'
import { customInitApp } from './firebase-admin-config';
import { User } from 'firebase/auth';

export const grantModerator = async(email: string, user: User | null) => {
    
    customInitApp()

    // Get email of the user 
    const userToBeAuthorized = await auth().getUserByEmail(email);
 
    user?.getIdTokenResult(true).then((idTokenResult) => {
      // checks if the current user is an admin as only admins can create new admins
        if(idTokenResult.claims.moderator){
          // checks if user with the email is already an admin
             if (
               userToBeAuthorized.customClaims &&
               userToBeAuthorized.customClaims.moderator === true
             )return;
            //  if not assign a moderator role as a new claim to user
             auth().setCustomUserClaims(userToBeAuthorized.uid, {
               moderator: true,
             });
             return {
                result: `Request fulfilled! ${email} is now an admin`
             }
        }else{
            return {
                result: `Request not authorized. User must be an admin `
            }
        }
    })
   
} 