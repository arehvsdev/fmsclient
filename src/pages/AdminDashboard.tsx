import { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/authService'
import Topbar from '../components/Topbar'
import '../styles/AdminDashboard.css'

function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<any>(null)
  const [faculties, setFaculties] = useState(0)
  const [students, setStudents] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      const response = await getCurrentUser()
      setAdminUser(response.data?.user)
      // TODO: Fetch faculties and students count from API
      setFaculties(5) // Placeholder
      setStudents(150) // Placeholder
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-dashboard">
      {/* Topbar */}
      <Topbar title="Admin Dashboard" />

      {/* Main Content */}
      <div className="dashboard-content">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {/* Admin Details Card */}
            <div className="card admin-card">
              <h2>Admin Details</h2>
              <div className="card-body">
                <p><strong>Name:</strong> {adminUser?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {adminUser?.email || 'N/A'}</p>
                <p><strong>Role:</strong> {adminUser?.role || 'Admin'}</p>
              </div>
            </div>

            {/* Faculties Card */}
            <div className="card">
              <h2>Total Faculties</h2>
              <div className="card-body">
                <p className="number">{faculties}</p>
              </div>
            </div>

            {/* Students Card */}
            <div className="card">
              <h2>Total Students</h2>
              <div className="card-body">
                <p className="number">{students}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard