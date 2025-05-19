'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Verificar autenticação usando localStorage
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Para desenvolvimento, usamos localStorage
        const isAuth = localStorage.getItem('admin_authenticated') === 'true'
        setIsAuthenticated(isAuth)
        
        if (!isAuth && pathname !== '/admin/login') {
          window.location.href = '/admin/login'
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [pathname])
  
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            margin: '0 auto',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #ff4400',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: '10px' }}>Carregando...</p>
        </div>
      </div>
    )
  }
  
  // Se não estiver autenticado e estiver na página de login, apenas mostrar o conteúdo
  if (!isAuthenticated && pathname === '/admin/login') {
    return children
  }
  
  // Se não estiver autenticado e não estiver na página de login, será redirecionado no useEffect
  if (!isAuthenticated) {
    return null
  }
  
  // Layout do admin com sidebar
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: '#333',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #444'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '0'
          }}>Cardápio Digital</h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#ccc',
            margin: '5px 0 0 0'
          }}>Painel Administrativo</p>
        </div>
        
        <nav style={{ marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {
              [
                { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
                { href: '/admin/categorias', label: 'Categorias', icon: 'category' },
                { href: '/admin/produtos', label: 'Produtos', icon: 'product' },
                { href: '/admin/pedidos', label: 'Pedidos', icon: 'order' },
                { href: '/admin/cozinha', label: 'Cozinha', icon: 'kitchen' },
                { href: '/admin/relatorios', label: 'Relatórios', icon: 'reports' },
                { href: '/admin/configuracoes', label: 'Configurações', icon: 'settings' },
              ].map(item => (
                <li key={item.href} style={{ marginBottom: '5px' }}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      backgroundColor: pathname === item.href || pathname.startsWith(`${item.href}/`) ? '#ff4400' : 'transparent',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      margin: '0 10px'
                    }}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
        
        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <button
            onClick={() => {
              localStorage.removeItem('admin_authenticated')
              window.location.href = '/admin/login'
            }}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '30px' }}>
        {children}
      </main>
    </div>
  )
}
