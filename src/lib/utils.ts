import { supabase } from './supabase';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Imagem placeholder em base64 - um quadrado cinza simples
export const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=';

/**
 * Formata um valor numérico para o formato de moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Função para truncar texto com limite de caracteres
 */
export function truncateText(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
}

/**
 * Gera um slug a partir de um texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Função para manipulação de upload de imagens
 */

export async function uploadImage(file: File, bucket: string, path: string) {
  try {
    // Geramos um nome de arquivo único com timestamp e slug do nome original
    const fileName = `${Date.now()}_${generateSlug(file.name)}`;
    
    // Construímos o caminho completo no bucket (pasta/nomearquivo)
    const fullPath = path ? `${path}/${fileName}` : fileName;
    
    // Realizamos o upload do arquivo para o Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false // Não sobrescrever arquivo existente
      });
    
    // Se ocorrer um erro durante o upload, lançamos o erro
    if (error) throw error;
    
    // Obtemos a URL pública do arquivo que acabamos de fazer upload
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);
    
    // Retornamos a URL pública do arquivo
    return urlData.publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    
    // Em caso de falha no upload, usamos a imagem placeholder como fallback
    console.warn('Usando imagem placeholder como fallback');
    return PLACEHOLDER_IMAGE;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tipos para horários de funcionamento
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

// Mapear dia da semana para chave do objeto
export const DAY_MAP = {
  0: 'sunday',
  1: 'monday', 
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
} as const;

// Utilitário para verificar se a loja deveria estar aberta
export const shouldStoreBeOpen = (businessHours: BusinessHours): boolean => {
  const now = new Date()
  const currentDay = now.getDay() // 0 = domingo, 1 = segunda, etc.
  const currentTime = now.toTimeString().slice(0, 5) // HH:MM
  
  const todayKey = DAY_MAP[currentDay as keyof typeof DAY_MAP]
  const todayHours = businessHours[todayKey]
  
  // Se não há horário definido para hoje, loja está fechada
  if (!todayHours || todayHours.trim() === '') {
    return false
  }
  
  // Parse do horário (formato: "10:00-22:00")
  const hourRange = todayHours.split('-')
  if (hourRange.length !== 2) {
    return false
  }
  
  const [openTime, closeTime] = hourRange.map(time => time.trim())
  
  // Verificar se o horário atual está dentro do intervalo
  if (closeTime < openTime) {
    // Caso especial: funcionamento através da meia-noite (ex: 22:00-02:00)
    return currentTime >= openTime || currentTime <= closeTime
  } else {
    // Caso normal: funcionamento no mesmo dia
    return currentTime >= openTime && currentTime <= closeTime
  }
}

// Função para obter informações do horário atual
export const getCurrentStoreStatus = (businessHours: BusinessHours) => {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = now.toTimeString().slice(0, 5)
  const todayKey = DAY_MAP[currentDay as keyof typeof DAY_MAP]
  const todayHours = businessHours[todayKey]
  
  return {
    shouldBeOpen: shouldStoreBeOpen(businessHours),
    currentTime,
    todayHours,
    dayOfWeek: todayKey,
    timestamp: now
  }
}

// Função para verificar se é um horário válido (formato HH:MM-HH:MM)
export const isValidTimeRange = (timeRange: string): boolean => {
  if (!timeRange || timeRange.trim() === '') return true // Vazio é válido (fechado)
  
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  return regex.test(timeRange.trim())
}

// Função para formatar horário para exibição
export const formatBusinessHours = (businessHours: BusinessHours): string => {
  const now = new Date()
  const currentDay = now.getDay()
  const todayKey = DAY_MAP[currentDay as keyof typeof DAY_MAP]
  const todayHours = businessHours[todayKey]
  
  if (!todayHours || todayHours.trim() === '') {
    return 'Fechado hoje'
  }
  
  return `Hoje: ${todayHours}`
}

// Função para obter próximo horário de abertura (se fechado)
export const getNextOpenTime = (businessHours: BusinessHours): string | null => {
  const currentStatus = getCurrentStoreStatus(businessHours)
  
  if (currentStatus.shouldBeOpen) {
    return null // Já está aberto
  }
  
  const now = new Date()
  const currentDay = now.getDay()
  
  // Verificar se ainda vai abrir hoje
  const todayKey = DAY_MAP[currentDay as keyof typeof DAY_MAP]
  const todayHours = businessHours[todayKey]
  
  if (todayHours && todayHours.trim() !== '') {
    const [openTime] = todayHours.split('-').map(time => time.trim())
    const currentTime = now.toTimeString().slice(0, 5)
    
    if (currentTime < openTime) {
      return `Abre hoje às ${openTime}`
    }
  }
  
  // Procurar próximo dia que abre
  for (let i = 1; i <= 7; i++) {
    const nextDay = (currentDay + i) % 7
    const nextDayKey = DAY_MAP[nextDay as keyof typeof DAY_MAP]
    const nextDayHours = businessHours[nextDayKey]
    
    if (nextDayHours && nextDayHours.trim() !== '') {
      const [openTime] = nextDayHours.split('-').map(time => time.trim())
      const dayNames = {
        monday: 'segunda-feira',
        tuesday: 'terça-feira', 
        wednesday: 'quarta-feira',
        thursday: 'quinta-feira',
        friday: 'sexta-feira',
        saturday: 'sábado',
        sunday: 'domingo'
      }
      
      const dayName = dayNames[nextDayKey as keyof typeof dayNames]
      return `Abre ${i === 1 ? 'amanhã' : dayName} às ${openTime}`
    }
  }
  
  return 'Horários não definidos'
}
