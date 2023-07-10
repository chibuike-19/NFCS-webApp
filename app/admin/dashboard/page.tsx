'use client'

import ProtectedRoute from '../../component/protectedRoute'

const AdminDashboard = () => {
    return (
        <div>
            Welcome, Admin 
            <button>Log Out</button>
        </div>
    )
}
export default ProtectedRoute(AdminDashboard)