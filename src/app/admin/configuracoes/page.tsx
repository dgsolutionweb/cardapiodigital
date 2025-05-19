'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export default function SettingsPage() {
  // Configurações básicas
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [storeName, setStoreName] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Status da loja
  const [storeOpen, setStoreOpen] = useState(true)
  
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
  
  useEffect(() => {
    fetchSettings()
  }, [])
  
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
        
        // Status da loja
        saveConfigItem('store_open', storeOpen.toString()),
        
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

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Configurações</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Geral
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'business' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Funcionamento
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'delivery' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Entrega
                </button>
              </nav>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
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
                          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Status da Loja</h3>
                      <p className="text-sm text-gray-500">{storeOpen ? 'Aberto para pedidos' : 'Fechado para pedidos'}</p>
                    </div>
                    <button 
                      type="button"  
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${storeOpen ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={() => setStoreOpen(!storeOpen)}
                    >
                      <span className="sr-only">Alterar status</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${storeOpen ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
              
              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span>Salvando...</span>
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    </>
                  ) : (
                    <span>Salvar Configurações</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
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
        className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        placeholder="10:00-22:00"
      />
    </div>
  )
}
