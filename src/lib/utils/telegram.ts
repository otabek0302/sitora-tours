// Telegram API utility
export const sendTelegramMessage = async (message: string): Promise<boolean> => {
  const telegramToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN'
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID'

  const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.error('Telegram API Error:', errorData)
    throw new Error(errorData.description || 'Failed to send message')
  }

  return true
}

// Common date formatter
export const formatDateRange = (start: string, end: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return `${new Date(start).toLocaleDateString('en-US', options)} - ${new Date(end).toLocaleDateString('en-US', options)}`
}

// Calculate days between dates
export const calculateDays = (start: string, end: string): number => {
  return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24))
}
