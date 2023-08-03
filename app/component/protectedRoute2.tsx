'use client'

import { useRouter } from "next/navigation";
import { auth } from "../context/firebase";
import { useAuth } from "../context/authService";
import { Loader } from "./loader";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function SecondProtectedRoute() {
    // const userToken = JSON.parse(localStorage.getItem(
    //   "firebase:authUser:AIzaSyAtnU6oCV37ouae6eYQpaGrlQ1EYZ2AVhY"
    // )!);
    if(!auth.currentUser){
        return redirect('/login')
    }

}