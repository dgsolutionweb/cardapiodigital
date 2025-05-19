export default function AdminEntrar() {
  return (
    <html>
      <head>
        <title>Login Admin</title>
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '300px'
        }}>
          <h1 style={{ color: '#ff4400', textAlign: 'center' }}>Login Administrativo</h1>
          <form action="/admin" method="get">
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
              <input 
                type="email" 
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  boxSizing: 'border-box',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }} 
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
              <input 
                type="password" 
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
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#ff4400',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Entrar
            </button>
          </form>
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <a 
              href="/" 
              style={{ 
                color: '#ff4400', 
                textDecoration: 'none' 
              }}
            >
              Voltar para o Cardápio
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
