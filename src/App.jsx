import React, { useEffect, useMemo, useState } from 'react'
import Contacts from './Contacts.jsx'
import Chat from './Chat.jsx'
import FolderView from './FolderView.jsx'
import { seedOnce, load, save } from './utils.js'

export default function App(){
  const [page, setPage] = useState('contacts') // 'contacts' | 'chat' | 'folders'
  const [activeId, setActiveId] = useState(null)

  useEffect(()=> seedOnce(), [])

  const contacts = useMemo(()=> load('notiva_contacts', []), [])
  const onSelect = (c) => { setActiveId(c.id); setPage('chat') }

  return (
    <>
      {page==='contacts' && (
        <Contacts
          contacts={contacts}
          onSelect={onSelect}
          onViewFolders={()=> setPage('folders')}
        />
      )}

      {page==='chat' && (
        <Chat
          contactId={activeId}
          onBack={()=> setPage('contacts')}
          openFolders={()=> setPage('folders')}
        />
      )}

      {page==='folders' && (
        <FolderView
          onBack={()=> setPage('contacts')}
        />
      )}
    </>
  )
}

