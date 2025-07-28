import GridLoader from 'react-spinners/GridLoader'
import { FaBook } from 'react-icons/fa'

const Spinner = ({ size = 'md', message = '', variant = 'default' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const spinnerSizes = {
    sm: 8,
    md: 12,
    lg: 16
  }

  const colors = {
    default: '#3b82f6',
    primary: '#3b82f6',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b'
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      {/* Custom Book Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
          <div className="absolute inset-2 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
        </div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaBook className="text-blue-500 text-xl animate-pulse" />
        </div>
      </div>

      {/* React Spinners Fallback */}
      <div className="mt-4">
        <GridLoader
          color={colors[variant]}
          size={spinnerSizes[size]}
          speedMultiplier={0.8}
        />
      </div>

      {/* Loading Message */}
      {message && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-medium animate-pulse">
            {message}
          </p>
        </div>
      )}

      {/* Loading Dots */}
      <div className="flex gap-1 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  )
}

export default Spinner
