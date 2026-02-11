import React, { useState, useEffect } from 'react'
import { dashboardService } from '../services';
import { useToast } from '../context/ToastContext';

const Student = ({presendSidebar, myBarRef}) => {
    const toast = useToast();
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Store all users for client-side filtering
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
      fetchUsers();
    }, []);

    // Client-side filtering when search query changes
    useEffect(() => {
      if (!searchQuery.trim()) {
        setUsers(allUsers);
      } else {
        const filtered = allUsers.filter(user => 
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(filtered);
      }
    }, [searchQuery, allUsers]);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getAllUsers();
        if (response.success && response.data) {
          // Handle nested data structure
          const usersData = response.data.users || (Array.isArray(response.data) ? response.data : []);
          setUsers(usersData);
          setAllUsers(usersData); // Store all users
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setUsers(allUsers);
        return;
      }
      
      // Try server-side search first
      try {
        setLoading(true);
        const response = await dashboardService.searchUsers(searchQuery);
        if (response.success && response.data) {
          // Handle nested data structure
          const usersData = response.data.users || (Array.isArray(response.data) ? response.data : []);
          setUsers(usersData);
        }
      } catch (error) {
        // Fallback to client-side filtering
        const filtered = allUsers.filter(user => 
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(filtered);
      } finally {
        setLoading(false);
      }
    };

    const handleClearSearch = () => {
      setSearchQuery("");
      setUsers(allUsers);
    };

    const handleDelete = async (userId) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      
      try {
        setDeleteLoading(userId);
        await dashboardService.deleteUser(userId);
        toast.success("User deleted successfully");
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
      } finally {
        setDeleteLoading(null);
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-8'>
      {/* Mobile Menu Button */}
      <div className='absolute top-4 left-4 md:hidden block' ref={myBarRef}>
        <button 
          onClick={presendSidebar}
          className='p-2 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300'
        >
          <i className="fa-sharp fa-solid fa-bars text-xl text-indigo-600"></i>
        </button>
      </div>

      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-8 pt-12 md:pt-0'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                Students & Users
              </h1>
              <p className='text-gray-500 mt-1'>Manage all registered users and students</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='bg-white rounded-2xl px-4 py-2 shadow-lg'>
                <span className='text-sm text-gray-500'>Total Users</span>
                <p className='text-2xl font-bold text-indigo-600'>{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mb-6 border border-white/50'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 relative'>
              <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
              </div>
              <input 
                type="text" 
                placeholder="Search users by name or email..." 
                className='w-full pl-12 pr-12 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none text-gray-700'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              )}
            </div>
            <button 
              onClick={handleSearch}
              disabled={loading}
              className='px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <i className="fa-solid fa-search"></i>
                  Search
                </>
              )}
            </button>
          </div>
          {searchQuery && (
            <p className='mt-3 text-sm text-gray-500'>
              Showing {users.length} result{users.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Users Table */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-white/50'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white'>
                  <th className='px-6 py-4 text-left font-semibold'>User</th>
                  <th className='px-6 py-4 text-left font-semibold'>Email</th>
                  <th className='px-6 py-4 text-left font-semibold'>Role</th>
                  <th className='px-6 py-4 text-left font-semibold'>Joined</th>
                  <th className='px-6 py-4 text-left font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className='text-gray-500'>Loading users...</p>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <div className='flex flex-col items-center gap-4'>
                        <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center'>
                          <i className="fa-solid fa-users text-3xl text-gray-400"></i>
                        </div>
                        <p className='text-gray-500 text-lg'>No users found</p>
                        <p className='text-gray-400 text-sm'>Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((item, index) => (
                    <tr 
                      className='hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300' 
                      key={item._id}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-4'>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                            index % 4 === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
                            index % 4 === 1 ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                            index % 4 === 2 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                            'bg-gradient-to-br from-amber-500 to-orange-600'
                          }`}>
                            {item.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className='font-semibold text-gray-800'>{item.name || 'Unknown'}</p>
                            <p className='text-xs text-gray-400'>ID: {item._id?.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          <i className="fa-solid fa-envelope text-gray-400"></i>
                          <span className='text-gray-600'>{item.email}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          item.role === 'admin' 
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30' 
                            : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                        }`}>
                          <i className={`fa-solid ${item.role === 'admin' ? 'fa-crown' : 'fa-user'}`}></i>
                          {item.role || 'user'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2 text-gray-500'>
                          <i className="fa-solid fa-calendar text-gray-400"></i>
                          {formatDate(item.createdAt)}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          disabled={deleteLoading === item._id || item.role === 'admin'}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            item.role === 'admin' 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30'
                          }`}
                        >
                          {deleteLoading === item._id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-trash"></i>
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        {!loading && users.length > 0 && (
          <div className='mt-6 flex flex-wrap gap-4 justify-center'>
            <div className='bg-white rounded-xl px-6 py-3 shadow-lg flex items-center gap-3'>
              <div className='w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center'>
                <i className="fa-solid fa-user-check text-emerald-600"></i>
              </div>
              <div>
                <p className='text-xs text-gray-400'>Total Users</p>
                <p className='font-bold text-gray-800'>{users.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Student
