import React, { useMemo, useState } from 'react'
import './Contacts.css'   // ← IMPORTANT: loads the styles in this message

export default function Contacts({ contacts, onSelect, onViewFolders }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return contacts.filter(c => c.name.toLowerCase().includes(q.toLowerCase()))
  }, [q, contacts])

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="brand">Notiva</div>
        <div className="rightArea">
          <button className="signBtn">Sign in</button>
        </div>
      </div>

      {/* Search + Folder */}
      <div className="searchWrap">
        <input
          className="searchInput"
          placeholder="Search for contacts..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        {/* Neon outline folder (SVG) — bigger + glow */}
        <button className="folderBtn" onClick={onViewFolders} aria-label="Open folders">
          <svg
            className="folderSvg"
            viewBox="0 0 44 34"
            width="44"
            height="34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* tab */}
            <path
              d="M6 9h10l3 4"
              className="folderStroke"
            />
            {/* body outline */}
            <path
              d="M4 9h16l3 4h17a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Z"
              className="folderStroke"
            />
          </svg>
        </button>
      </div>

      {/* Contacts */}
      <div className="list">
        {filtered.map(c => (
          <div key={c.id} className="contactItem" onClick={() => onSelect(c)}>
            <div className="avatar">{c.name[0]?.toUpperCase()}</div>
            <div className="name">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}




