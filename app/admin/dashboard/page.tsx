'use client'

import ProtectedRoute from '../../component/protectedRoute'
import { useAuth } from '@/app/context/authService'
import { useRouter } from 'next/navigation'
import { grantModerator } from '@/lib/admin-config'

const AdminDashboard = () => {
    const router = useRouter()
    const {user, logOut, userEmailRef} = useAuth()


    const addAdmin = async(data: FormData) => {
       const email = data.get('email')?.valueOf()
       if (typeof(email) !== 'string')return
        // const response = await grantModerator(email, user)
    }

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
        <button onClick={signOut}>Log Out</button>
      </div>
    );
}
export default ProtectedRoute(AdminDashboard)