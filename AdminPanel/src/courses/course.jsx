<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { courseService, uploadService } from '../services';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Course = ({presendSidebar, myBarRef}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
      fetchCourses();
    }, []);

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseService.getAllCourses();
        if (response.success && response.data) {
          const coursesData = response.data.courses || (Array.isArray(response.data) ? response.data : []);
          setCourses(coursesData);
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (courseId) => {
      if (!window.confirm("Are you sure you want to delete this course?")) return;
      
      try {
        setDeleteLoading(courseId);
        await courseService.deleteCourse(courseId);
        toast.success("Course deleted successfully");
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        toast.error(error.message || "Failed to delete course");
      } finally {
        setDeleteLoading(null);
      }
    };

    const getImageUrl = (image) => {
      if (!image) return "/courseimg/web.png";
      if (image.startsWith('http')) return image;
      return uploadService.getImageUrl(image);
    };

    const getCategoryStyle = (category) => {
      const styles = {
        'Web Development': { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'fa-code' },
        'Graphic Design': { bg: 'bg-pink-100', text: 'text-pink-700', icon: 'fa-palette' },
        'Business Strategy': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'fa-briefcase' },
        'Data Science': { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'fa-database' },
        'Mobile Development': { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'fa-mobile-alt' },
        'Other': { bg: 'bg-slate-100', text: 'text-slate-700', icon: 'fa-folder' }
      };
      return styles[category] || styles['Other'];
    };
=======
import React, { useEffect, useState } from 'react'
import { adminLocalHost } from '../adminlocalhost';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Course = ({presendSidebar, myBarRef, editItem}) => {


    const myAdmintoken = localStorage.getItem("adminToken");
    const getUrl = `${adminLocalHost}/api/courses/admin/all`;


    useEffect(()=>{
         axios.get(getUrl, {
            headers: {
                Authorization: `Bearer ${myAdmintoken}`,
              },
         })
            .then((res)=>{
                console.log(res.data);
                console.log(res.data.data.courses);
                localStorage.setItem("myAllCourses", JSON.stringify(res.data.data.courses));
            })
    },[]);


    

    const [arr, setArr] = useState([]);

    useEffect(()=>{
      const myCourses = JSON.parse(localStorage.getItem("myAllCourses"));
      setArr(myCourses);
    },[])


    

    const removeItem = (id) => {
      console.log("This is course id",id);
      const holedltUrl = `${adminLocalHost}/api/courses/admin/delete/${id}`;

      axios.delete(holedltUrl, {
        headers:{
          Authorization:`Bearer ${myAdmintoken}`,
        }
      })
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })

      window.location.reload();
    }
>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 pt-4 pb-8'>
      {/* Mobile Menu Button */}
      <div className='absolute top-4 left-4 md:hidden block z-10' ref={myBarRef}>
        <button 
          onClick={presendSidebar}
          className='w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all'
        >
          <i className="fa-solid fa-bars text-slate-700"></i>
        </button>
      </div>

<<<<<<< HEAD
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:pt-0 pt-12 gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-slate-800 mb-2'>Courses</h1>
            <p className='text-slate-500'>Manage and organize your course catalog</p>
          </div>
          <button 
            onClick={() => navigate('/myform')}
            className='group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5'
          >
            <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform duration-300"></i>
            Add New Course
          </button>
=======
      <div className='py-1 w-full sm:px-5 px-1'>
      <div className='flex justify-between py-3 sm:mt-0 mt-3'>
      <h1 className='font-[700] text-[32px] text-[#0D121C]'>Courses</h1>
      <p className='font-[500] text-[14px] text-[#0D121C] bg-[#E8EDF2] px-2 h-[35px] flex justify-center items-center rounded-[6px] sm:mt-0 mt-1'>+ Add New Course</p>
      </div>
      
      <div className='py-6 sm:px-0 px-3 sm:w-[92%] w-[97%] m-left flex justify-center items-center'>

        <div className='overflow-x-auto w-full'>
             {/* <table className='min-w-[700px] w-full'> */}
             <table className=' w-full'>
            <thead>
                <th className='border border-0 px-2'>Thumbnail</th>
                <th className='border border-0 px-2'>Title</th>
                <th className='border border-0 px-2'>Category</th>
                <th className='border border-0 px-2'>Instructor</th>
                <th className='border border-0 px-2'>Price</th>
                <th className='border border-0 px-2'>Status</th>
                <th className='border border-0 px-2'>Actions</th>
            </thead>

            {
              arr.map((item)=>{
                return(
                  <tr className='mt-3 w-full'>
                  <td className='border border-0 mt-2 py-2 flex justify-center items-center'>
                      <img src={item.image} className='w-8 h-8 rounded-full ' alt="" />
                  </td>
                  <td className='border border-0 text-[14px] font-[400] text-[#0D121C] px-2 text-center'>{item.title}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.category}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>{item.instructor}</td>
                  <td className='border border-0 text-[14px] font-[400] text-[#4F6B96] px-2 text-center'>${item.price}</td>
                  <td className='border border-0 w-[40px]'><span className='text-[14px] font-[500] text-[#0D121C] w-full px-2 text-center bg-[#E8EDF2] px-2 h-[40px]'>{item.isActive === true ? "Active":"NotActive"}</span></td>
                  <td className='border border-0 text-[14px] font-[700] text-[#4F6B96] px-2 text-center'><Link to="/myform"><button type="button" className='cursor-pointer' onClick={()=>editItem(item._id)}>Edit</button></Link>, <button type="button" className="cursor-pointer" onClick={()=>removeItem(item._id)}>Delete</button>, View</td>
              </tr>
                )
              })
             
            }
            
           </table>

>>>>>>> 5d2fb0e45bb3aa119061f3d9eac4884c54ba7628
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='flex flex-col items-center gap-4'>
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className='text-slate-500'>Loading courses...</p>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100'>
            <div className='w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6'>
              <i className="fa-solid fa-book-open text-4xl text-indigo-500"></i>
            </div>
            <h3 className='text-xl font-semibold text-slate-800 mb-2'>No Courses Yet</h3>
            <p className='text-slate-500 mb-6'>Start by adding your first course</p>
            <button 
              onClick={() => navigate('/myform')}
              className='px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all'
            >
              Create Course
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courses.map((item, index) => {
              const categoryStyle = getCategoryStyle(item.category);
              return (
                <div 
                  key={item._id} 
                  className='group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className='relative h-48 overflow-hidden'>
                    <img 
                      src={getImageUrl(item.image)} 
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                      alt={item.title}
                      onError={(e) => { e.target.src = '/courseimg/web.png' }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                    <div className='absolute top-4 left-4'>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}>
                        <i className={`fa-solid ${categoryStyle.icon}`}></i>
                        {item.category}
                      </span>
                    </div>
                    <div className='absolute bottom-4 right-4'>
                      <span className='text-2xl font-bold text-white'>${item.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-5'>
                    <h3 className='text-lg font-bold text-slate-800 mb-2 line-clamp-1'>{item.title}</h3>
                    <p className='text-sm text-slate-500 mb-4 line-clamp-2'>{item.description}</p>
                    
                    {/* Actions */}
                    <div className='flex items-center gap-2'>
                      <button 
                        onClick={() => navigate(`/myform?edit=${item._id}`)}
                        className='flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-xl hover:bg-indigo-100 transition-colors'
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        disabled={deleteLoading === item._id}
                        className='flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50'
                      >
                        {deleteLoading === item._id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <i className="fa-solid fa-trash"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Course
