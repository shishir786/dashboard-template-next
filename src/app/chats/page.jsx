"use client"

import { useEffect, useRef, useState } from 'react'
import { Search, Send, ArrowLeft } from 'lucide-react'

export default function MessagePage() {
  const demoCurrentUserId = 'me'

  const [conversations, setConversations] = useState(() => [
    {
      _id: 'c1',
      participants: [
        { _id: 'me', fullname: 'You', avatar: '' },
        { _id: 'u1', fullname: 'John Smith', avatar: 'https://avatar.iran.liara.run/public/28' },
      ],
      lastMessage: { text: "That would be great! Also, are you flexible on the price?", createdAt: Date.now() - 1000 * 60 * 60 },
      messages: [
        { id: 'm1', text: "What's the condition of the plate? Any damage or wear?", createdAt: Date.now() - 1000 * 60 * 60 * 4, msgByUserId: 'u1' },
        { id: 'm2', text: "It's in excellent condition, no visible damage.", createdAt: Date.now() - 1000 * 60 * 60 * 3, msgByUserId: 'me' },
        { id: 'm3', text: "That would be great! Also, are you flexible on the price?", createdAt: Date.now() - 1000 * 60 * 60 * 2, msgByUserId: 'u1' },
      ],
    },
    {
      _id: 'c2',
      participants: [
        { _id: 'me', fullname: 'You', avatar: '' },
        { _id: 'u2', fullname: 'Mike Wilson', avatar: 'https://avatar.iran.liara.run/public/29' },
      ],
      lastMessage: { text: 'Thanks for the quick response!', createdAt: Date.now() - 1000 * 60 * 60 * 24 },
      messages: [
        { id: 'm4', text: 'Thanks for the quick response!', createdAt: Date.now() - 1000 * 60 * 60 * 24, msgByUserId: 'u2' },
      ],
    },
  ])

  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?._id || null)
  const [showChat, setShowChat] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [search, setSearch] = useState('')

  const messagesContainerRef = useRef(null)

  useEffect(() => {
    if (!selectedConversationId && conversations.length) setSelectedConversationId(conversations[0]._id)
  }, [])

  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return
    const id = setTimeout(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      } catch (e) {
        el.scrollTop = el.scrollHeight
      }
    }, 50)
    return () => clearTimeout(id)
  }, [selectedConversationId, conversations])

  const filteredConvs = conversations.filter((c) => {
    const other = (c.participants || []).find((p) => p._id !== demoCurrentUserId) || {}
    return other.fullname?.toLowerCase().includes(search.toLowerCase())
  })

  const selectedConversation = conversations.find((c) => c._id === selectedConversationId) || null

  const handleSend = () => {
    const text = (newMessage || '').trim()
    if (!text || !selectedConversationId) return

    setConversations((prev) =>
      prev.map((c) =>
        c._id === selectedConversationId
          ? {
              ...c,
              messages: [...c.messages, { id: String(Date.now()), text, createdAt: Date.now(), msgByUserId: demoCurrentUserId }],
              lastMessage: { text, createdAt: Date.now() },
            }
          : c,
      ),
    )

    setNewMessage('')
    // keep mobile view open
  }

  const handleConversationSelect = (id) => {
    setSelectedConversationId(id)
    setShowChat(true)
  }

  const handleBackToConversations = () => {
    setShowChat(false)
  }

  return (
    <div className='min-h-[calc(100vh-104px)] w-full bg-sidebar p-3'>
      <div className='flex flex-col lg:flex-row gap-4 h-[calc(100vh-104px)] w-full' style={{ fontFamily: 'Poppins' }}>
        {/* Left */}
  <div className={`w-full lg:w-[450px] flex flex-col gap-4 bg-sidebar h-full ${showChat ? 'hidden lg:flex' : 'flex'}`}>
          <div className='p-2 bg-card rounded-md border border-border flex items-center gap-2'>
            <Search className='w-5 h-5 text-gray-500' />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='w-full bg-transparent outline-none' />
          </div>

          <div className='flex flex-col gap-2 overflow-y-auto flex-1 h-full'>
            {filteredConvs.map((c) => {
              const other = (c.participants || []).find((p) => p._id !== demoCurrentUserId) || {}
              return (
                <div
                  key={c._id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${c._id === selectedConversationId ? 'bg-[#B9D1F6]' : 'border border-[#EAECEE] hover:bg-gray-50'}`}
                  onClick={() => handleConversationSelect(c._id)}
                >
                  <div className='w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0'>
                    <img src={other.avatar || ''} alt={other.fullname} className='w-full h-full object-cover' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <h3 className='text-foreground text-sm font-semibold truncate'>{other.fullname || 'Unknown'}</h3>
                        <p className='text-muted-foreground text-xs truncate'>{c.lastMessage?.text || ''}</p>
                      </div>
                      <span className='text-xs text-muted-foreground ml-2'>{new Date(c.lastMessage?.createdAt || Date.now()).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chat */}
  <div className={`flex-1 flex flex-col border-t lg:border-t-0 lg:border-l border-border bg-sidebar min-h-0 h-full ${!showChat && !selectedConversationId ? 'hidden lg:flex' : 'flex'}`}>
          <div className='flex items-center gap-3 p-4 border-b border-border'>
            <button onClick={handleBackToConversations} className='lg:hidden p-2 hover:bg-gray-100 rounded-full'>
              <ArrowLeft className='w-5 h-5 text-[#1A1A1A]' />
            </button>
            <h2 className='text-foreground text-lg font-medium truncate'>{(selectedConversation && ((selectedConversation.participants || []).find((p) => p._id !== demoCurrentUserId) || {}).fullname) || 'No conversation selected'}</h2>
          </div>

          <div ref={messagesContainerRef} className='flex-1 overflow-y-auto p-4'>
            {!selectedConversation ? (
              <div className='flex items-center justify-center h-full'>
                <div className='text-center'>
                  <div className='text-gray-400 text-lg mb-2'>💬</div>
                  <p className='text-gray-500 text-sm'>Select a conversation to start chatting</p>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-6'>
                {selectedConversation.messages.map((message) => {
                  const isMe = String(message.msgByUserId) === String(demoCurrentUserId)
                  return (
                    <div key={message.id || message._id || message.createdAt} className={`flex gap-3 ${isMe ? 'justify-end' : ''}`}>
                          {!isMe && (
                            <div className='w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0'>
                              <img src={(selectedConversation.participants || [])[1]?.avatar || ''} alt='' className='w-full h-full object-cover' />
                            </div>
                          )}

                          <div className={`max-w-[90%] ${isMe ? 'items-end text-right' : 'items-start'}`}>
                            <div className={`${isMe ? 'bg-card' : 'bg-primary/20'} inline-block px-4 py-3 rounded-[20px] text-foreground`}>{message.text}</div>
                            <div className='text-xs text-muted-foreground mt-1'>{new Date(message.createdAt).toLocaleTimeString()}</div>
                          </div>

                          {isMe && (
                            <div className='w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0'>
                              <img src='' alt='me' className='w-full h-full object-cover' />
                            </div>
                          )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {selectedConversation && (
            <div className='p-4'>
              <div className='flex items-center gap-3 p-3 rounded-[40px] border border-border bg-card'>
                <input
                  type='text'
                  placeholder='Type a message'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className='flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground'
                />
                <button onClick={handleSend} className='p-2 rounded-full border border-border hover:bg-primary/10'>
                  <Send className='w-5 h-5 text-primary' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
