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
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Library
          </Link>
        </div>

        {/* Book Details Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 text-center text-white">
              <FaBook className="text-6xl mb-4 mx-auto opacity-90" />
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 px-4">
                {book.title}
              </h1>
              <p className="text-xl opacity-90">Book Details</p>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-200">
                <FaHeart size={16} />
              </button>
              <button className="btn btn-circle btn-sm bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-200">
                <FaShare size={16} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Book Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBook className="mr-3 text-blue-600" />
                    Book Information
                  </h2>

                  <div className="space-y-6">
                    {/* Title */}
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Title
                      </label>
                      <p className="text-xl font-bold text-gray-800 mt-2">
                        {book.title}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center">
                        <FaUser className="mr-2" />
                        Author
                      </label>
                      <p className="text-xl font-bold text-gray-800 mt-2">
                        {book.author}
                      </p>
                    </div>

                    {/* Published Year */}
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-500">
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center">
                        <FaCalendar className="mr-2" />
                        Published Year
                      </label>
                      <p className="text-xl font-bold text-gray-800 mt-2">
                        {book.publishedYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      to={`/books/update/${book._id}`}
                      className="btn btn-outline btn-success w-full group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FaEdit className="mr-2 relative z-10" />
                      <span className="relative z-10">Edit Book</span>
                    </Link>

                    <Link
                      to={`/books/delete/${book._id}`}
                      className="btn btn-outline btn-error w-full group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FaTrash className="mr-2 relative z-10" />
                      <span className="relative z-10">Delete Book</span>
                    </Link>
                  </div>
                </div>

                {/* Book Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Book Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Added to Library</span>
                      <span className="font-semibold text-gray-800">Recently</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Category</span>
                      <span className="badge badge-primary">Literature</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="badge badge-success">Available</span>
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
