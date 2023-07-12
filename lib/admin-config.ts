'use server'

import {auth} from 'firebase-admin'
import { customInitApp } from './firebase-admin-config';
import { User } from 'firebase/auth';

export const grantModerator = async(email: string, user: User | null) => {
    
    customInitApp()

    const userToBeAuthenticated = await auth().getUserByEmail(email);
 
    user?.getIdTokenResult(true).then((idTokenResult) => {
        if(idTokenResult.claims.moderator){
             if (
               userToBeAuthenticated.customClaims &&
               userToBeAuthenticated.customClaims.moderator === true
             )return;
             auth().setCustomUserClaims(userToBeAuthenticated.uid, {
               moderator: true,
             });
             return {
                result: `Request fulfilled! ${email} is now an admin`
             }
        }else{
            return {
                result: `Request not authorized.User must be an admin `
            }
        }
    })
   
} 