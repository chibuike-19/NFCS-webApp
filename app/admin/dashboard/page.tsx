'use client'

import ProtectedRoute from '../../component/protectedRoute'
import { useAuth } from '@/app/context/authService'
import {ref, set, push, onValue} from 'firebase/database'
import { useRouter } from 'next/navigation'
import { db } from '@/app/context/firebase'
import { grantModerator } from '@/lib/admin-config'
import { useRef } from 'react'

const AdminDashboard = () => {
    const router = useRouter()
    const eventRef = useRef<HTMLInputElement>(null);
    const desc_ref = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null); 
    const dateRef = useRef<HTMLInputElement>(null);
    const {user, logOut, userEmailRef} = useAuth()

    // Assign admin role to a user
    const addAdmin = async(data: FormData) => {
       const email = data.get('email')?.valueOf()
       if (typeof(email) !== 'string')return
        // const response = await grantModerator(email, user)
    }

    const handleAddEvent = (e:any) => {
      e.preventDefault();
      const reference = ref(db, 'upcoming_event/')

      // To retrieve data of a list
      const event_ref = onValue(reference, (snapshot) => {
        snapshot.forEach(snap => {
          console.log(snap.val())
        })
      })
      // Add to a list of item in a particular reference

      // push(reference, {
      //   event_name: eventRef.current?.value,
      //   event_desc: desc_ref.current?.value,
      //   event_date: dateRef.current?.value,
      //   event_time: timeRef.current?.value,
      // });
      
      // Add a single item to a particular reference

      // set(reference, {
      //   event_name: eventRef.current?.value,
      //   event_desc: desc_ref.current?.value,
      //   event_date: dateRef.current?.value,
      //   event_time: timeRef.current?.value
      // })
    }
      // Logs out user
      const signOut = () => {
        logOut;
        router.push("/");
      };
    return (
      <div>
        Welcome, Admin {user?.displayName}
        <h1>Add new Admin</h1>
        <form action={addAdmin}>
          <label htmlFor="">Enter Email</label>
          <input type="email" name="email" id=""  />
          <input type="submit" />
        </form>
         <form onSubmit={handleAddEvent}>
          <label htmlFor="">Add new Post </label>
          <input type="text" placeholder='post name' ref={eventRef}/>
          <input type="text" name="email" id="" ref={desc_ref} placeholder='post description' />
          <input type="text" placeholder='post date' ref={dateRef}/>
          <input type="text" placeholder='post time' ref={timeRef} />
          
          <input type="submit"  />
        </form>
        <button onClick={signOut}>Log Out</button>
      </div>
    );
}
export default ProtectedRoute(AdminDashboard)