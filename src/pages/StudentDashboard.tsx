import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearUser, setUser } from '../redux/authSlice'
import { getCurrentUser, logoutUser } from '../services/authService'
import { FiAward, FiMail, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        email: '',
        role: ''
    });
    useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUser();
        const user = response.data.user;
        dispatch(setUser(user));
        setStudent({
          name: user.name,
          email: user.email,
          role: user.role
        })
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(clearUser())
      }
    }

    loadUser();
  }, [dispatch])

    const handleLogout = async () => {
        // Clear the authToken cookie
        dispatch(clearUser());
        await logoutUser();
        navigate("/login");
    }   
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Student Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold text-white">
              {student.name.charAt(0)}
            </div>

            <div>
              <p className="font-medium text-slate-800">{student.name}</p>
              <p className="text-sm text-slate-500 capitalize">
                {student.role}
              </p>
            </div>
            <div>
                <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600" 
                    onClick={() => handleLogout()}>
                  Logout
                </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-6">
        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Profile Information
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <div className="rounded-lg bg-sky-100 p-3">
                <FiUser className="text-xl text-sky-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-semibold text-slate-800">
                  {student.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <div className="rounded-lg bg-emerald-100 p-3">
                <FiMail className="text-xl text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-slate-800">
                  {student.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <div className="rounded-lg bg-violet-100 p-3">
                <FiAward className="text-xl text-violet-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p className="font-semibold capitalize text-slate-800">
                  {student.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold">
            Welcome back, {student.name}! 👋
          </h2>

          <p className="mt-3 text-sky-100">
            Update the information in your profile and manage your account settings.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard