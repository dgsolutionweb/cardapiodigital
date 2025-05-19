'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Usando o client Supabase para autenticação
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Salvando também no localStorage para compatibilidade com o layout atual
      localStorage.setItem('admin_authenticated', 'true');
      
      // Exibindo mensagem de sucesso
      toast.success('Login realizado com sucesso!');
      
      // Redirecionando para o painel admin
      router.push('/admin');
    } catch (err: any) {
      console.error('Erro de login:', err);
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '350px'
      }}>
        <h1 style={{textAlign: 'center', color: '#ff4400', marginBottom: '20px'}}>Login Admin</h1>
        
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#d32f2f',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>Senha:</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ff4400',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div style={{marginTop: '15px', textAlign: 'center'}}>
          <a 
            href="/" 
            style={{color: '#ff4400', textDecoration: 'none'}}
          >
            Voltar para o Cardápio
          </a>
        </div>
      </div>
    </div>
  );
}
