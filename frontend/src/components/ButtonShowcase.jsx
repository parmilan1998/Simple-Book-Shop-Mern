import { BsInfoCircle } from 'react-icons/bs'
import { FaEdit, FaPlus, FaHeart, FaStar } from 'react-icons/fa'
import { MdDelete, MdDownload } from 'react-icons/md'

const ButtonShowcase = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Enhanced Button Designs
        </h1>
        
        {/* Primary Action Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Primary Action Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Gradient Button with Shimmer */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Gradient with Shimmer</h3>
              <button className="btn btn-primary w-full group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                <BsInfoCircle size={16} className="group-hover:animate-pulse relative z-10" />
                <span className="relative z-10">View Details</span>
              </button>
            </div>

            {/* Lift Effect Button */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Lift Effect</h3>
              <button className="btn btn-success w-full btn-hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaEdit size={16} className="group-hover:rotate-12 transition-transform duration-200 relative z-10" />
                <span className="relative z-10">Edit Book</span>
              </button>
            </div>

            {/* Glow Effect Button */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Glow Effect</h3>
              <button className="btn btn-error w-full btn-hover-glow group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MdDelete size={16} className="group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Delete Book</span>
              </button>
            </div>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Icon Buttons</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-wrap gap-4 justify-center">
              
              {/* Pulse Icon Button */}
              <button className="btn btn-circle btn-primary group">
                <FaHeart size={20} className="group-hover:animate-pulse text-white" />
              </button>

              {/* Spin Icon Button */}
              <button className="btn btn-circle btn-secondary group">
                <FaStar size={20} className="group-hover:animate-spin text-white" />
              </button>

              {/* Bounce Icon Button */}
              <button className="btn btn-circle btn-accent group">
                <MdDownload size={20} className="group-hover:animate-bounce text-white" />
              </button>

              {/* Scale Icon Button */}
              <button className="btn btn-circle btn-info group">
                <FaPlus size={20} className="group-hover:scale-125 transition-transform duration-200 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* Button Groups */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Button Groups</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            
            {/* Action Button Group */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Action Group</h3>
              <div className="flex gap-2 justify-center">
                <button className="btn btn-sm btn-primary group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500"></div>
                  <BsInfoCircle size={14} className="group-hover:animate-pulse relative z-10" />
                  <span className="relative z-10">View</span>
                </button>
                
                <button className="btn btn-sm btn-outline btn-success group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <FaEdit size={14} className="group-hover:rotate-12 transition-transform duration-200 relative z-10" />
                  <span className="relative z-10">Edit</span>
                </button>
                
                <button className="btn btn-sm btn-outline btn-error group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <MdDelete size={14} className="group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10">Delete</span>
                </button>
              </div>
            </div>

            {/* Floating Action Group */}
            <div>
              <h3 className="text-lg font-medium mb-4">Floating Actions</h3>
              <div className="action-btn-group justify-center">
                <button className="btn btn-xs btn-primary hover:scale-110 transition-all duration-200">
                  <BsInfoCircle size={12} />
                </button>
                <button className="btn btn-xs btn-success hover:scale-110 transition-all duration-200">
                  <FaEdit size={12} />
                </button>
                <button className="btn btn-xs btn-error hover:scale-110 transition-all duration-200">
                  <MdDelete size={12} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Interactive Demo</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 mb-6">
              Hover over the buttons to see the enhanced animations and effects in action!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn btn-lg btn-primary group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                <span className="relative z-10">Shimmer Effect</span>
              </button>
              
              <button className="btn btn-lg btn-success btn-hover-lift">
                <span>Lift & Shadow</span>
              </button>
              
              <button className="btn btn-lg btn-error btn-hover-glow">
                <span>Glow Effect</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ButtonShowcase
