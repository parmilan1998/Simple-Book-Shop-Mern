import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaBook, FaUser, FaCalendar, FaEdit, FaTrash, FaHeart, FaShare } from "react-icons/fa";
import { toast } from 'react-toastify';
import axiosInstance from "../utils/axiosInstance";

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error('Failed to load book details', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'colored',
        });
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600 font-medium">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-8 font-inter font-medium"
          >
            <FaArrowLeft className="mr-2 w-4 h-4" />
            Back to Library
          </Link>
        </div>

        {/* Book Details Card */}
        <div className="glass-effect shadow-luxury rounded-3xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900 h-80 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

            <div className="relative z-10 text-center text-white px-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-2xl">
                <FaBook className="text-4xl opacity-90" />
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-4 px-4 font-lora tracking-tight">
                {book.title}
              </h1>

              <p className="text-xl lg:text-2xl opacity-90 font-inter">Book Details & Information</p>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute top-8 right-8 flex gap-3">
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-xl transition-all duration-300 flex items-center justify-center group">
                <FaHeart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-xl transition-all duration-300 flex items-center justify-center group">
                <FaShare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-16">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Details */}
              <div className="lg:col-span-2 space-y-10">
                {/* Book Information */}
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center font-lora">
                    <FaBook className="mr-4 text-primary-600 text-2xl" />
                    Book Information
                  </h2>

                  <div className="space-y-8">
                    {/* Title */}
                    <div className="bg-slate-50 rounded-2xl p-8 border-l-4 border-primary-500 shadow-sm">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider font-inter mb-3 block">
                        Title
                      </label>
                      <p className="text-2xl font-bold text-slate-900 font-lora leading-tight">
                        {book.title}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="bg-slate-50 rounded-2xl p-8 border-l-4 border-accent-500 shadow-sm">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider font-inter mb-3 flex items-center">
                        <FaUser className="mr-2 w-4 h-4" />
                        Author
                      </label>
                      <p className="text-2xl font-bold text-slate-900 font-lora">
                        {book.author}
                      </p>
                    </div>

                    {/* Published Year */}
                    <div className="bg-slate-50 rounded-2xl p-8 border-l-4 border-secondary-500 shadow-sm">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider font-inter mb-3 flex items-center">
                        <FaCalendar className="mr-2 w-4 h-4" />
                        Published Year
                      </label>
                      <p className="text-2xl font-bold text-slate-900 font-lora">
                        {book.publishedYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-8 shadow-elegant border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-lora">Quick Actions</h3>
                  <div className="space-y-4">
                    <Link
                      to={`/books/update/${book._id}`}
                      className="w-full bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-inter flex items-center justify-center"
                    >
                      <FaEdit className="mr-3 w-4 h-4" />
                      Edit Book
                    </Link>

                    <Link
                      to={`/books/delete/${book._id}`}
                      className="w-full border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300 font-inter flex items-center justify-center"
                    >
                      <FaTrash className="mr-3 w-4 h-4" />
                      Delete Book
                    </Link>
                  </div>
                </div>

                {/* Book Stats */}
                <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border border-primary-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-lora">Book Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-inter">Added to Library</span>
                      <span className="font-semibold text-slate-900 font-inter">Recently</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-inter">Category</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
                        Literature
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-inter">Status</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-800">
                        Available
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-inter">Book Age</span>
                      <span className="font-semibold text-slate-900 font-inter">
                        {new Date().getFullYear() - book.publishedYear} years
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
