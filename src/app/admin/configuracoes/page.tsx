'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { shouldStoreBeOpen, BusinessHours, getCurrentStoreStatus, getNextOpenTime } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  // Configurações básicas
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [storeName, setStoreName] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Status da loja e controle automático
  const [storeOpen, setStoreOpen] = useState(true)
  const [autoScheduleEnabled, setAutoScheduleEnabled] = useState(false)
  const [lastAutoUpdate, setLastAutoUpdate] = useState<Date | null>(null)
  const [manualOverride, setManualOverride] = useState(false)
  
  // Configurações de entrega
  const [deliveryFee, setDeliveryFee] = useState('0.00')
  const [minOrderValue, setMinOrderValue] = useState('0.00')
  const [deliveryTime, setDeliveryTime] = useState('30-45')
  const [deliveryRadius, setDeliveryRadius] = useState('5')
  
  // Horários de funcionamento
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: '10:00-22:00',
    tuesday: '10:00-22:00',
    wednesday: '10:00-22:00',
    thursday: '10:00-22:00',
    friday: '10:00-23:00',
    saturday: '10:00-23:00',
    sunday: '11:00-22:00',
  })
  
  // Estado da UI
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Estado para limpeza de dados
  const [showClearDataModal, setShowClearDataModal] = useState(false)
  const [clearDataPassword, setClearDataPassword] = useState('')
  const [clearingData, setClearingData] = useState(false)
  
  useEffect(() => {
    fetchSettings()
  }, [])
  
  // Hook para verificação automática de horários
  useEffect(() => {
    if (!autoScheduleEnabled || manualOverride) return
    
    const checkStoreHours = () => {
      const shouldBeOpen = shouldStoreBeOpen(businessHours)
      
      if (shouldBeOpen !== storeOpen) {
        console.log(`Auto-atualizando status da loja: ${shouldBeOpen ? 'ABERTA' : 'FECHADA'}`)
        setStoreOpen(shouldBeOpen)
        setLastAutoUpdate(new Date())
        
        // Salvar no banco de dados
        saveConfigItem('store_open', shouldBeOpen.toString())
        
        toast.success(
          shouldBeOpen 
            ? '🟢 Loja aberta automaticamente conforme horário configurado!' 
            : '🔴 Loja fechada automaticamente conforme horário configurado!'
        )
      }
    }
    
    // Verificar imediatamente
    checkStoreHours()
    
    // Verificar a cada minuto
    const interval = setInterval(checkStoreHours, 60 * 1000)
    
    return () => clearInterval(interval)
  }, [autoScheduleEnabled, businessHours, storeOpen, manualOverride])
  
  const fetchSettings = async () => {
    try {
      setLoading(true)
      
      // Buscar todas as configurações de uma vez
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
      
      if (error) throw error
      
      if (data && data.length > 0) {
        // Processar cada configuração
        data.forEach(setting => {
          switch(setting.key) {
            case 'whatsapp_number':
              setWhatsappNumber(setting.value);
              break;
            case 'store_name':
              setStoreName(setting.value);
              break;
            case 'address':
              setStoreAddress(setting.value);
              break;
            case 'store_open':
              setStoreOpen(setting.value === 'true');
              break;
            case 'auto_schedule_enabled':
              setAutoScheduleEnabled(setting.value === 'true');
              break;
            case 'manual_override':
              setManualOverride(setting.value === 'true');
              break;
            case 'delivery_fee':
              setDeliveryFee(setting.value);
              break;
            case 'min_order_value':
              setMinOrderValue(setting.value);
              break;
            case 'delivery_time':
              setDeliveryTime(setting.value);
              break;
            case 'delivery_radius':
              setDeliveryRadius(setting.value);
              break;
            case 'logo_url':
              setLogoUrl(setting.value);
              break;
            case 'business_hours':
              try {
                const hours = JSON.parse(setting.value);
                if (hours && typeof hours === 'object') {
                  setBusinessHours(hours as BusinessHours);
                }
              } catch (e) {
                console.error('Erro ao processar horários:', e);
              }
              break;
          }
        });
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setLoading(false);
    }
  }
  
  // Função auxiliar para salvar uma configuração
  const saveConfigItem = async (key: string, value: string) => {
    // Verificar se a configuração já existe
    const { data: existingConfig, error: queryError } = await supabase
      .from('settings')
      .select('id')
      .eq('key', key)
      
    // Se houver erro de consulta, presumir que não existe
    const configExists = !queryError && existingConfig && existingConfig.length > 0
    
    // Atualizar ou criar a configuração
    if (configExists && existingConfig && existingConfig.length > 0) {
      // Usar o ID do primeiro item encontrado
      const itemId = existingConfig[0].id
      
      const { error } = await supabase
        .from('settings')
        .update({ 
          value: value,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId)
      
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('settings')
        .insert({
          key: key,
          value: value,
          created_at: new Date().toISOString(),
        })
      
      if (error) throw error
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      
      // Fazer upload da logo se uma nova foi selecionada
      let logoUrlToSave = logoUrl
      if (logoFile) {
        const uploadedUrl = await uploadLogo()
        if (uploadedUrl) {
          logoUrlToSave = uploadedUrl
        }
      }
      
      // Salvar todas as configurações
      await Promise.all([
        // Configurações básicas
        saveConfigItem('store_name', storeName),
        saveConfigItem('whatsapp_number', whatsappNumber),
        saveConfigItem('address', storeAddress),
        saveConfigItem('logo_url', logoUrlToSave),
        
        // Status da loja e controles automáticos
        saveConfigItem('store_open', storeOpen.toString()),
        saveConfigItem('auto_schedule_enabled', autoScheduleEnabled.toString()),
        saveConfigItem('manual_override', manualOverride.toString()),
        
        // Configurações de entrega
        saveConfigItem('delivery_fee', deliveryFee),
        saveConfigItem('min_order_value', minOrderValue),
        saveConfigItem('delivery_time', deliveryTime),
        saveConfigItem('delivery_radius', deliveryRadius),
        
        // Horários de funcionamento
        saveConfigItem('business_hours', JSON.stringify(businessHours)),
      ])
      
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      toast.error('Erro ao salvar configurações')
    } finally {
      setSaving(false)
    }
  }
  
  // Função para selecionar arquivo de logo
  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    setLogoFile(file)
    
    // Criar preview da imagem
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setLogoUrl(e.target.result.toString())
      }
    }
    reader.readAsDataURL(file)
  }
  
  // Função para fazer upload da logo
  const uploadLogo = async () => {
    if (!logoFile) return null
    
    try {
      setUploadingLogo(true)
      
      // Criar nome de arquivo único baseado na data e nome original
      const fileExt = logoFile.name.split('.').pop()
      const fileName = `logo-${Date.now()}.${fileExt}`
      const filePath = `logos/${fileName}`
      
      // Upload para o Supabase Storage usando o bucket 'products'
      const { data, error } = await supabase.storage
        .from('products')
        .upload(filePath, logoFile)
      
      if (error) throw error
      
      // Construir URL pública da imagem
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbketwbrlawpbktasva.supabase.co'
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/products/${data.path}`
      
      return publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da logo:', error)
      toast.error('Erro ao fazer upload da imagem')
      return null
    } finally {
      setUploadingLogo(false)
    }
  }
  
  // Função para atualizar horário de funcionamento
  const handleBusinessHoursChange = (day: keyof BusinessHours, value: string) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: value
    }))
  }
  
  // Controle manual do status da loja
  const handleStoreToggle = () => {
    const newStatus = !storeOpen
    setStoreOpen(newStatus)
    
    if (autoScheduleEnabled) {
      // Se está ativando manualmente contra o horário, ativar override
      const shouldBeOpen = shouldStoreBeOpen(businessHours)
      if (newStatus !== shouldBeOpen) {
        setManualOverride(true)
        toast('Override manual ativado. Para voltar ao automático, desative e reative o agendamento.', {
          icon: '⚠️',
          duration: 4000
        })
      }
    }
  }
  
  // Controle do agendamento automático
  const handleAutoScheduleToggle = () => {
    const newAutoSchedule = !autoScheduleEnabled
    setAutoScheduleEnabled(newAutoSchedule)
    
    if (newAutoSchedule) {
      // Ao ativar automático, remover override e verificar horário atual
      setManualOverride(false)
      const shouldBeOpen = shouldStoreBeOpen(businessHours)
      setStoreOpen(shouldBeOpen)
      toast.success('Agendamento automático ativado! Status da loja ajustado conforme horário atual.')
    } else {
      setManualOverride(false)
      toast('Agendamento automático desativado. Controle agora é manual.', {
        icon: 'ℹ️',
        duration: 4000
      })
    }
  }
  
  // Helper para formatar input de dinheiro
  const formatCurrency = (value: string) => {
    // Remove caracteres não numéricos, exceto ponto
    const numericValue = value.replace(/[^0-9.]/g, '')
    // Certifica-se de ter no máximo um ponto decimal
    const parts = numericValue.split('.')
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('')
    }
    return numericValue
  }

  // Função para limpar todos os dados do sistema
  const handleClearAllData = async () => {
    if (clearDataPassword !== 'P@ssw0rd2025') {
      toast.error('Senha incorreta!')
      return
    }

    try {
      setClearingData(true)
      
      // Lista de tabelas para limpar (em ordem devido às dependências)
      const tablesToClear = [
        'order_items',     // Primeiro os itens (dependem de orders e products)
        'orders',          // Depois os pedidos
        'product_extras',  // Adicionais dos produtos
        'product_variations', // Variações dos produtos
        'products',        // Produtos (dependem de categories)
        'categories'       // Por último as categorias
      ]
      
      let clearedCount = 0
      
      for (const table of tablesToClear) {
        // Primeiro buscar todos os IDs da tabela
        const { data: records, error: fetchError } = await supabase
          .from(table as any)
          .select('id')
        
        if (fetchError) {
          console.error(`Erro ao buscar registros da tabela ${table}:`, fetchError)
          throw fetchError
        }
        
        // Se há registros, deletar todos usando a lista de IDs
        if (records && records.length > 0) {
          const ids = records.map((record: any) => record.id)
          const { error: deleteError } = await supabase
            .from(table as any)
            .delete()
            .in('id', ids)
          
          if (deleteError) {
            console.error(`Erro ao limpar tabela ${table}:`, deleteError)
            throw deleteError
          }
        }
        
        clearedCount++
        toast.loading(`Limpando dados... ${clearedCount}/${tablesToClear.length}`)
      }
      
      // Resetar configurações para valores padrão (mantendo apenas configurações básicas)
      const defaultSettings = [
        { key: 'store_open', value: 'false' },
        { key: 'auto_schedule_enabled', value: 'false' },
        { key: 'manual_override', value: 'false' },
        { key: 'delivery_fee', value: '0.00' },
        { key: 'min_order_value', value: '0.00' },
        { key: 'delivery_time', value: '30-45' },
        { key: 'delivery_radius', value: '5' },
      ]
      
      for (const setting of defaultSettings) {
        await saveConfigItem(setting.key, setting.value)
      }
      
      toast.dismiss()
      toast.success('🎉 Todos os dados foram removidos com sucesso!')
      toast.success('Sistema resetado para produção!', { duration: 4000 })
      
      // Fechar modal e resetar estado
      setShowClearDataModal(false)
      setClearDataPassword('')
      
      // Recarregar as configurações
      await fetchSettings()
      
    } catch (error) {
      console.error('Erro ao limpar dados:', error)
      toast.dismiss()
      toast.error('Erro ao limpar dados do sistema')
    } finally {
      setClearingData(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Configure as informações do seu estabelecimento</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'general' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Geral
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'business' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Funcionamento
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'delivery' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Entrega
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'system' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sistema
              </button>
            </nav>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Informações Gerais */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Logo do Estabelecimento
                  </label>
                  
                  <div className="flex items-start space-x-6">
                    <div className="w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden">
                      {logoUrl ? (
                        <Image 
                          src={logoUrl} 
                          alt="Logo" 
                          width={144} 
                          height={144} 
                          className="object-contain" 
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleLogoSelect}
                      />
                      
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={uploadingLogo}
                      >
                        {uploadingLogo ? 'Carregando...' : 'Escolher Logo'}
                      </button>
                      
                      <p className="text-sm text-gray-500 mt-2">
                        Recomendado: Imagem quadrada de pelo menos 200x200 pixels em formato PNG ou JPG.
                      </p>
                      
                      {logoUrl && (
                        <button
                          type="button"
                          onClick={() => setLogoUrl('')}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remover logo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="store_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Estabelecimento
                  </label>
                  <input
                    id="store_name"
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome do seu estabelecimento"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Este nome será exibido no cardápio e nos pedidos.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rua Exemplo, 123 - Bairro, Cidade - UF"
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de WhatsApp
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      +
                    </span>
                    <input
                      id="whatsapp"
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5511999999999"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Digite o número com código do país e DDD, sem espaços ou caracteres especiais. Exemplo: 5511999999999
                  </p>
                </div>
              </div>
            )}
            
            {/* Configurações de Funcionamento */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                {/* Status da Loja Manual */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Status da Loja</h3>
                      <p className="text-sm text-gray-500">
                        {storeOpen ? 'Aberto para pedidos' : 'Fechado para pedidos'}
                        {manualOverride && ' (Override manual ativo)'}
                      </p>
                    </div>
                    <button 
                      type="button"  
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${storeOpen ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={handleStoreToggle}
                    >
                      <span className="sr-only">Alterar status</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${storeOpen ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Agendamento Automático */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-blue-900">Agendamento Automático</h3>
                      <p className="text-sm text-blue-700">
                        {autoScheduleEnabled 
                          ? 'Loja abre/fecha automaticamente conforme horários configurados' 
                          : 'Controle manual do status da loja'
                        }
                      </p>
                    </div>
                    <button 
                      type="button"  
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${autoScheduleEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                      onClick={handleAutoScheduleToggle}
                    >
                      <span className="sr-only">Alterar agendamento automático</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${autoScheduleEnabled ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                  
                  {autoScheduleEnabled && (
                    <div className="text-xs text-blue-600 space-y-1">
                      <p>✅ Sistema verifica os horários a cada minuto</p>
                      <p>✅ Status atualizado automaticamente</p>
                      {lastAutoUpdate && (
                        <p>📅 Última verificação: {lastAutoUpdate.toLocaleTimeString('pt-BR')}</p>
                      )}
                      {manualOverride && (
                        <p className="text-orange-600 font-medium">⚠️ Override manual ativo - Para voltar ao automático, desative e reative o agendamento</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Atual Baseado no Horário */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Status Baseado no Horário Atual</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horário atual:</span>
                      <span className="font-medium">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span className="font-medium">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status sugerido:</span>
                      <span className={`font-bold ${shouldStoreBeOpen(businessHours) ? 'text-green-600' : 'text-red-600'}`}>
                        {shouldStoreBeOpen(businessHours) ? '🟢 ABERTA' : '🔴 FECHADA'}
                      </span>
                    </div>
                    
                    {!shouldStoreBeOpen(businessHours) && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Próxima abertura:</span>
                          <span className="font-medium text-blue-600">{getNextOpenTime(businessHours)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">Horários de Funcionamento</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <BusinessHourInput 
                        day="Segunda-feira" 
                        value={businessHours.monday} 
                        onChange={(value) => handleBusinessHoursChange('monday', value)} 
                      />
                      <BusinessHourInput 
                        day="Terça-feira" 
                        value={businessHours.tuesday} 
                        onChange={(value) => handleBusinessHoursChange('tuesday', value)} 
                      />
                      <BusinessHourInput 
                        day="Quarta-feira" 
                        value={businessHours.wednesday} 
                        onChange={(value) => handleBusinessHoursChange('wednesday', value)} 
                      />
                      <BusinessHourInput 
                        day="Quinta-feira" 
                        value={businessHours.thursday} 
                        onChange={(value) => handleBusinessHoursChange('thursday', value)} 
                      />
                      <BusinessHourInput 
                        day="Sexta-feira" 
                        value={businessHours.friday} 
                        onChange={(value) => handleBusinessHoursChange('friday', value)} 
                      />
                      <BusinessHourInput 
                        day="Sábado" 
                        value={businessHours.saturday} 
                        onChange={(value) => handleBusinessHoursChange('saturday', value)} 
                      />
                      <BusinessHourInput 
                        day="Domingo" 
                        value={businessHours.sunday} 
                        onChange={(value) => handleBusinessHoursChange('sunday', value)} 
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Formato: HH:MM-HH:MM (24h). Exemplo: 10:00-22:00. Deixe em branco para dias fechados.
                  </p>
                </div>
              </div>
            )}
            
            {/* Configurações de Entrega */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="delivery_fee" className="block text-sm font-medium text-gray-700 mb-1">
                    Taxa de Entrega (R$)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      R$
                    </span>
                    <input
                      id="delivery_fee"
                      type="text"
                      value={deliveryFee}
                      onChange={(e) => setDeliveryFee(formatCurrency(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="min_order_value" className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Mínimo de Pedido (R$)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      R$
                    </span>
                    <input
                      id="min_order_value"
                      type="text"
                      value={minOrderValue}
                      onChange={(e) => setMinOrderValue(formatCurrency(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Valor mínimo necessário para realizar um pedido. Deixe 0 para não ter valor mínimo.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="delivery_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Tempo de Entrega (minutos)
                  </label>
                  <input
                    id="delivery_time"
                    type="text"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30-45"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Tempo estimado de entrega (ex: 30-45, 40-60).
                  </p>
                </div>
                
                <div>
                  <label htmlFor="delivery_radius" className="block text-sm font-medium text-gray-700 mb-1">
                    Raio de Entrega (km)
                  </label>
                  <input
                    id="delivery_radius"
                    type="number"
                    value={deliveryRadius}
                    onChange={(e) => setDeliveryRadius(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5"
                    min="0"
                    step="0.5"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Distância máxima para entrega em quilômetros.
                  </p>
                </div>
              </div>
            )}
            
            {/* Configurações do Sistema */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-red-900">Zona de Perigo</h3>
                      <p className="text-red-700 mt-1 mb-4">
                        Esta seção contém operações irreversíveis que podem afetar permanentemente o sistema.
                      </p>
                      
                      <div className="bg-white rounded-lg p-4 border border-red-300">
                        <h4 className="font-medium text-gray-900 mb-2">Limpar Todos os Dados</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Remove <strong>TODOS</strong> os dados cadastrados no sistema incluindo:
                          categorias, produtos, pedidos, variações, adicionais e redefine configurações.
                        </p>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <p className="text-sm text-yellow-800 font-medium">
                              ⚠️ Esta ação é <strong>IRREVERSÍVEL</strong> e não pode ser desfeita!
                            </p>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1 ml-7">
                            Use apenas para preparar o sistema para produção após testes.
                          </p>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setShowClearDataModal(true)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Limpar Todos os Dados
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    Salvando...
                  </>
                ) : (
                  'Salvar Configurações'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Modal de Confirmação para Limpeza de Dados */}
      {showClearDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Confirmar Limpeza de Dados</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  Esta ação irá <strong className="text-red-600">REMOVER PERMANENTEMENTE</strong> todos os dados:
                </p>
                
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Todas as categorias e produtos
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Todos os pedidos e histórico
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Variações e adicionais
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Configurações de entrega
                  </li>
                </ul>
                
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ Esta ação NÃO PODE ser desfeita!
                  </p>
                </div>
                
                <div>
                  <label htmlFor="clear-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Digite a senha para confirmar:
                  </label>
                  <input
                    id="clear-password"
                    type="password"
                    value={clearDataPassword}
                    onChange={(e) => setClearDataPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Digite a senha de confirmação"
                    disabled={clearingData}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Senha necessária para autorizar esta operação crítica.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowClearDataModal(false)
                    setClearDataPassword('')
                  }}
                  disabled={clearingData}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                
                <button
                  type="button"
                  onClick={handleClearAllData}
                  disabled={clearingData || !clearDataPassword}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {clearingData ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                      Limpando...
                    </>
                  ) : (
                    'Confirmar Limpeza'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente auxiliar para os horários de funcionamento
function BusinessHourInput({ day, value, onChange }: { day: string, value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex items-center">
      <div className="w-32 flex-shrink-0">
        <span className="text-sm font-medium text-gray-700">{day}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="10:00-22:00"
      />
    </div>
  )
}
