/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const FloatingActionButton = ({ 
  to, 
  icon, 
  label, 
  variant = 'primary', 
  size = 'md',
  position = 'bottom-right',
  onClick,
  className = ''
}) => {
  const baseClasses = 'btn btn-circle shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group relative overflow-hidden'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    success: 'btn-success',
    error: 'btn-error',
    warning: 'btn-warning',
    info: 'btn-info'
  }
  
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md', 
    lg: 'btn-lg'
  }
  
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6 z-50',
    'bottom-left': 'fixed bottom-6 left-6 z-50',
    'top-right': 'fixed top-20 right-6 z-50',
    'top-left': 'fixed top-20 left-6 z-50'
  }
  
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${positionClasses[position]}
    ${className}
  `.trim()

  const ButtonContent = () => (
    <>
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
      
      {/* Icon */}
      <span className="relative z-10 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </span>
      
      {/* Tooltip */}
      {label && (
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
            {label}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </div>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        <ButtonContent />
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      <ButtonContent />
    </button>
  )
}

export default FloatingActionButton
