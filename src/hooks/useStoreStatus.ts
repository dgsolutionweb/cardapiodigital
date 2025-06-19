import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { shouldStoreBeOpen, BusinessHours, getCurrentStoreStatus } from '@/lib/utils'
import toast from 'react-hot-toast'

interface StoreStatus {
  isOpen: boolean
  businessHours: BusinessHours
  autoScheduleEnabled: boolean
  manualOverride: boolean
  lastUpdate: Date | null
  loading: boolean
  currentStatus: ReturnType<typeof getCurrentStoreStatus>
}

export const useStoreStatus = (enableAutoCheck = false) => {
  const [status, setStatus] = useState<StoreStatus>({
    isOpen: true,
    businessHours: {
      monday: '10:00-22:00',
      tuesday: '10:00-22:00',
      wednesday: '10:00-22:00',
      thursday: '10:00-22:00',
      friday: '10:00-23:00',
      saturday: '10:00-23:00',
      sunday: '11:00-22:00',
    },
    autoScheduleEnabled: false,
    manualOverride: false,
    lastUpdate: null,
    loading: true,
    currentStatus: {
      shouldBeOpen: false,
      currentTime: '',
      todayHours: '',
      dayOfWeek: 'monday',
      timestamp: new Date()
    }
  })

  // Função para buscar configurações do banco
  const fetchStoreSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['store_open', 'business_hours', 'auto_schedule_enabled', 'manual_override'])

      if (error) throw error

      // Criar novo objeto de status
      const newStatus: Partial<StoreStatus> = {
        loading: false
      }

      if (data) {
        data.forEach(setting => {
          switch(setting.key) {
            case 'store_open':
              newStatus.isOpen = setting.value === 'true'
              break
            case 'auto_schedule_enabled':
              newStatus.autoScheduleEnabled = setting.value === 'true'
              break
            case 'manual_override':
              newStatus.manualOverride = setting.value === 'true'
              break
            case 'business_hours':
              try {
                const hours = JSON.parse(setting.value)
                if (hours && typeof hours === 'object') {
                  newStatus.businessHours = hours as BusinessHours
                }
              } catch (e) {
                console.error('Erro ao processar horários:', e)
              }
              break
          }
        })
      }

      // Calcular status atual baseado nos horários se disponível
      if (newStatus.businessHours) {
        newStatus.currentStatus = getCurrentStoreStatus(newStatus.businessHours)
      }

      // Atualizar status usando função de callback para evitar dependências
      setStatus(prev => ({
        ...prev,
        ...newStatus
      }))

      return newStatus
    } catch (error) {
      console.error('Erro ao buscar configurações da loja:', error)
      setStatus(prev => ({ ...prev, loading: false }))
      return null
    }
  }, [])

  // Função para atualizar status no banco
  const updateStoreStatus = useCallback(async (newIsOpen: boolean) => {
    try {
      const { data: existingConfig } = await supabase
        .from('settings')
        .select('id')
        .eq('key', 'store_open')

      if (existingConfig && existingConfig.length > 0) {
        const { error } = await supabase
          .from('settings')
          .update({ 
            value: newIsOpen.toString(),
            updated_at: new Date().toISOString()
          })
          .eq('key', 'store_open')

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('settings')
          .insert({
            key: 'store_open',
            value: newIsOpen.toString(),
            created_at: new Date().toISOString(),
          })

        if (error) throw error
      }

      setStatus(prev => ({
        ...prev,
        isOpen: newIsOpen,
        lastUpdate: new Date()
      }))

      return true
    } catch (error) {
      console.error('Erro ao atualizar status da loja:', error)
      return false
    }
  }, [])

  // Hook para verificação automática de horários
  useEffect(() => {
    if (!enableAutoCheck || !status.autoScheduleEnabled || status.manualOverride || status.loading) {
      return
    }

    const checkStoreHours = async () => {
      const shouldBeOpen = shouldStoreBeOpen(status.businessHours)

      if (shouldBeOpen !== status.isOpen) {
        console.log(`Auto-atualizando status da loja: ${shouldBeOpen ? 'ABERTA' : 'FECHADA'}`)
        
        const success = await updateStoreStatus(shouldBeOpen)
        
        if (success) {
          toast.success(
            shouldBeOpen 
              ? '🟢 Loja aberta automaticamente conforme horário configurado!' 
              : '🔴 Loja fechada automaticamente conforme horário configurado!'
          )
        }
      }
    }

    // Verificar imediatamente
    checkStoreHours()

    // Verificar a cada minuto
    const interval = setInterval(checkStoreHours, 60 * 1000)

    return () => clearInterval(interval)
  }, [enableAutoCheck, status.autoScheduleEnabled, status.businessHours, status.isOpen, status.manualOverride, status.loading, updateStoreStatus])

  // Buscar configurações iniciais
  useEffect(() => {
    fetchStoreSettings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Atualizar status atual periodicamente
  useEffect(() => {
    const updateCurrentStatus = () => {
      setStatus(prev => ({
        ...prev,
        currentStatus: getCurrentStoreStatus(prev.businessHours)
      }))
    }

    // Atualizar a cada minuto
    const interval = setInterval(updateCurrentStatus, 60 * 1000)
    return () => clearInterval(interval)
  }, [status.businessHours])

  return {
    ...status,
    refreshSettings: fetchStoreSettings,
    updateStatus: updateStoreStatus
  }
} 