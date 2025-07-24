"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { HomeIcon, AcademicCapIcon, ChatBubbleLeftRightIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { name: "Home", path: "/dashboard", icon: HomeIcon },
    { name: "Learn", path: "/learn", icon: AcademicCapIcon },
    { name: "Ask AI", path: "/ask-ai", icon: ChatBubbleLeftRightIcon },
    { name: "My Profile", path: "/profile", icon: UserIcon },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KSL</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Kenya Sign Language</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.username}!</span>
            {user?.role === "admin" && (
              <Link to="/admin" className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700">
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar