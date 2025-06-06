import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      outlineIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      filledIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm12 0h4v4h-4v-4z" />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      name: "Employees",
      outlineIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      filledIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-8 0c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.01 1.97 3.45v1.5h6v-1.5c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      path: "/employees",
    },
    {
      name: "Attendance",
      outlineIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
        </svg>
      ),
      filledIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 20V10h14v10H5z" />
        </svg>
      ),
      path: "/attendance",
    },
    {
      name: "Payroll",
      outlineIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3zM5 10v10h14V10M8 7h8" />
        </svg>
      ),
      filledIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 4h14a2 2 0 012 2v14H3V6a2 2 0 012-2zm0 4v10h14V8H5zm3-2v2h8V6H8z" />
        </svg>
      ),
      path: "/payroll",
    },
    {
      name: "Settings",
      outlineIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V2m0 20v-2m8-10h2M2 12h2m14.95-6.36l1.414-1.414M4.636 19.364l1.414-1.414m0-12.728L4.636 4.636m14.728 14.728l-1.414-1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
      filledIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14 12.936c.035-.303.06-.61.06-.936s-.025-.633-.07-.936l2.03-1.578a.5.5 0 00.12-.637l-1.928-3.338a.5.5 0 00-.607-.217l-2.39.96a7.017 7.017 0 00-1.614-.936l-.36-2.53A.5.5 0 0014.37 2h-4.74a.5.5 0 00-.493.425l-.36 2.53a7.017 7.017 0 00-1.614.936l-2.39-.96a.5.5 0 00-.607.217L2.72 8.85a.5.5 0 00.12.637l2.03 1.578c-.045.303-.07.61-.07.936s.025.633.07.936l-2.03 1.578a.5.5 0 00-.12.637l1.928 3.338a.5.5 0 00.607.217l2.39-.96c.48.384 1.02.702 1.614.936l.36 2.53a.5.5 0 00.493.425h4.74a.5.5 0 00.493-.425l.36-2.53c.594-.234 1.134-.552 1.614-.936l2.39.96a.5.5 0 00.607-.217l1.928-3.338a.5.5 0 00-.12-.637l-2.03-1.578zM12 15a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
      ),
      path: "/settings",
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed z-50 md:relative bg-white shadow-md transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"} ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} h-full`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {isSidebarOpen && <h1 className="text-xl font-bold text-blue-600">HR System</h1>}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setMobileSidebarOpen(false);
                  }}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${location.pathname === item.path ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                >
                  <span className="flex-shrink-0">
                    {location.pathname === item.path ? item.filledIcon : item.outlineIcon}
                  </span>
                  {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Simple User Email Section */}
          <div className="mt-auto p-4 border-t">
            {isSidebarOpen ? (
              <p className="text-sm text-gray-600 truncate">
                {user?.email || "user@example.com"}
              </p>
            ) : (
              <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-5.5">
            <div className="flex items-center">
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 ml-2">
                {navItems.find(item => location.pathname.startsWith(item.path))?.name || "Dashboard"}
              </h2>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;