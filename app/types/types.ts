export interface ChatPart {
    text: string
}

export interface ChatMessage {
    role:  'system' | 'user' | 'assistant' | 'data'
    parts: ChatPart[]
}

