import React, { useRef, useState, useEffect } from 'react'
import "./form.css";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { courseService, uploadService } from '../services';
import { useToast } from '../context/ToastContext';

const Formm = ({presendSidebar, myBarRef}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;

  const [mycategory, setMycategory] = useState("");
  const [myTumbnil, setMyThumbnil] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState("");

  const fileInputRef = useRef();

  // Fetch course data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchCourseData();
    }
  }, [editId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const response = await courseService.getCourseById(editId);
      if (response.success && response.data) {
        const course = response.data.course || response.data;
        setTitle(course.title || '');
        setMycategory(course.category || '');
        setPrice(course.price?.toString() || '');
        setDescription(course.description || '');
        if (course.image) {
          setUploadedImageName(course.image);
          setPreviewImage(uploadService.getImageUrl(course.image));
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch course data");
      navigate('/mycourse');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    setMyThumbnil(file);
    setPreviewImage(URL.createObjectURL(file));

    // Upload image
    try {
      setUploadingImage(true);
      const response = await uploadService.uploadCourseImage(file);
      if (response.success && response.data) {
        setUploadedImageName(response.data.filename || response.data.image);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
      setMyThumbnil(null);
      setPreviewImage(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    
    if (!mycategory) {
      toast.error("Please select a category");
      return;
    }
    
    if (!price || parseFloat(price) < 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    if (!description || description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }

    const courseData = {
      title: title.trim(),
      category: mycategory,
      price: parseFloat(price),
      description: description.trim(),
      ...(uploadedImageName && { image: uploadedImageName })
    };

    setLoading(true);
    
    try {
      if (isEditMode) {
        await courseService.updateCourse(editId, courseData);
        toast.success("Course updated successfully!");
      } else {
        await courseService.createCourse(courseData);
        toast.success("Course created successfully!");
      }
      navigate('/mycourse');
    } catch (error) {
      toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'create'} course`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setMycategory("");
    setPrice("");
    setDescription("");
    setMyThumbnil(null);
    setPreviewImage(null);
    setUploadedImageName("");
  };

  if (loading && isEditMode) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center'>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className='text-gray-600 font-medium'>Loading course data...</p>
        </div>
      </div>
    );
  }

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

      <div className='max-w-4xl mx-auto pt-12 md:pt-0'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-4'>
            <button 
              onClick={() => navigate('/mycourse')}
              className='w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:shadow-xl transition-all duration-300'
            >
              <i className="fa-solid fa-arrow-left text-lg"></i>
            </button>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                {isEditMode ? 'Edit Course' : 'Create New Course'}
              </h1>
              <p className='text-gray-500 mt-1'>
                {isEditMode ? 'Update your course information' : 'Fill in the details to create a new course'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-3xl shadow-xl p-8 border border-white/50'>
          <form onSubmit={handlePublish}>
            {/* Course Details Section */}
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center'>
                  <i className="fa-solid fa-book text-white"></i>
                </div>
                <h2 className='text-xl font-bold text-gray-800'>Course Details</h2>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                {/* Course Title */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    <i className="fa-solid fa-heading mr-2 text-indigo-500"></i>
                    Course Title *
                  </label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className='w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none text-gray-700'
                    placeholder='e.g., Complete React Development Course'
                  />
                </div>

                {/* Category */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    <i className="fa-solid fa-folder mr-2 text-purple-500"></i>
                    Category *
                  </label>
                  <select 
                    value={mycategory} 
                    onChange={(e) => setMycategory(e.target.value)} 
                    className='w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none text-gray-700 cursor-pointer'
                  >
                    <option value="">Select category</option>
                    <option value="Web Development">🌐 Web Development</option>
                    <option value="Graphic Design">🎨 Graphic Design</option>
                    <option value="Business Strategy">💼 Business Strategy</option>
                    <option value="Data Science">📊 Data Science</option>
                    <option value="Mobile Development">📱 Mobile Development</option>
                    <option value="Other">📚 Other</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    <i className="fa-solid fa-dollar-sign mr-2 text-emerald-500"></i>
                    Price ($) *
                  </label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className='w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none text-gray-700'
                    placeholder='49.99'
                    min="0" 
                    step="0.01"
                  />
                </div>

                {/* Description */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    <i className="fa-solid fa-align-left mr-2 text-amber-500"></i>
                    Description *
                  </label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className='w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none text-gray-700 h-32 resize-none'
                    placeholder='Write a compelling description for your course...'
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail Section */}
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center'>
                  <i className="fa-solid fa-image text-white"></i>
                </div>
                <h2 className='text-xl font-bold text-gray-800'>Course Thumbnail</h2>
              </div>

              <div 
                onClick={handleImageClick} 
                className={`relative cursor-pointer border-3 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  previewImage 
                    ? 'border-indigo-300 bg-indigo-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className='hidden'
                />
                
                {uploadingImage ? (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className='text-indigo-600 font-medium'>Uploading image...</p>
                  </div>
                ) : previewImage ? (
                  <div className='flex flex-col items-center gap-4'>
                    <div className='relative'>
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className='w-48 h-32 object-cover rounded-xl shadow-lg'
                      />
                      <div className='absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                        <i className="fa-solid fa-camera text-white text-2xl"></i>
                      </div>
                    </div>
                    <p className='text-gray-500 text-sm'>Click to change image</p>
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-4 py-4'>
                    <div className='w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center'>
                      <i className="fa-solid fa-cloud-arrow-up text-3xl text-white"></i>
                    </div>
                    <div className='text-center'>
                      <h3 className='font-bold text-lg text-gray-800'>Drag and drop or browse</h3>
                      <p className='text-gray-500 text-sm mt-1'>PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-100'>
              <button 
                type="button" 
                onClick={() => navigate('/mycourse')}
                className='px-8 py-4 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-300'
              >
                <i className="fa-solid fa-xmark mr-2"></i>
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className='px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditMode ? 'Updating...' : 'Publishing...'}
                  </>
                ) : (
                  <>
                    <i className={`fa-solid ${isEditMode ? 'fa-save' : 'fa-rocket'}`}></i>
                    {isEditMode ? 'Update Course' : 'Publish Course'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Formm
