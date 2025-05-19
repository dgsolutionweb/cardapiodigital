'use client'

import Link from 'next/link'

export function TrackButton() {
  return (
    <Link 
      href="/rastrear" 
      className="flex items-center text-gray-700 hover:text-primary transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="hidden sm:inline text-sm font-medium">Rastrear Pedido</span>
    </Link>
  )
}
