import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/authService'
import Topbar from '../components/Topbar'
import '../styles/FacultyDashboard.css'

interface Feedback {
  id: string
  studentName: string
  subject: string
  message: string
  rating: number
  date: string
}

function FacultyDashboard() {
  const [facultyUser, setFacultyUser] = useState<any>(null)
  const [studentCount, setStudentCount] = useState(0)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFacultyData()
  }, [])

  const fetchFacultyData = async () => {
    try {
      setLoading(true)
      const response = await getCurrentUser()
      setFacultyUser(response.data?.user)
      // TODO: Fetch student count and feedback from API
      setStudentCount(45) // Placeholder
      setFeedback([
        {
          id: '1',
          studentName: 'John Doe',
          subject: 'Excellent Teaching',
          message: 'The lectures are very clear and well-organized.',
          rating: 5,
          date: '2024-07-10'
        }
      ]) // Placeholder feedback
    } catch (error) {
      console.error('Failed to fetch faculty data:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="faculty-dashboard">
      <Topbar title="Faculty Dashboard" />

      <div className="dashboard-content">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {/* Faculty Details Card */}
            <div className="card faculty-card">
              <h2>Faculty Details</h2>
              <div className="card-body">
                <p><strong>Name:</strong> {facultyUser?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {facultyUser?.email || 'N/A'}</p>
                <p><strong>Department:</strong>Entri</p>
                <p><strong>Designation:</strong> Faculty</p>
              </div>
            </div>

            {/* Student Count Card */}
            <div className="card">
              <h2>Total Students</h2>
              <div className="card-body">
                <p className="number">{studentCount}</p>
              </div>
            </div>

            {/* Feedback List */}
            <div className="card feedback-card full-width">
              <h2>Student Feedback</h2>
              <div className="feedback-list">
                {feedback.length > 0 ? (
                  feedback.map((item) => (
                    <div key={item.id} className="feedback-item">
                      <div className="feedback-header">
                        <h3>{item.subject}</h3>
                        <span className="feedback-date">{item.date}</span>
                      </div>
                      <p className="student-name">From: <strong>{item.studentName}</strong></p>
                      <p className="feedback-message">{item.message}</p>
                      <div className="feedback-rating">
                        <span className="stars">{renderStars(item.rating)}</span>
                        <span className="rating-text">({item.rating}/5)</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-feedback">No feedback received yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FacultyDashboard