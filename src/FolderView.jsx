import React, { useMemo, useState } from 'react'
import { load, save } from './utils.js'

export default function FolderView({ onBack }) {
  const [folderSearch, setFolderSearch] = useState('')
  const [fileSearch, setFileSearch] = useState('')
  const [active, setActive] = useState('A')
  const [folders, setFolders] = useState(load('notiva_folders', { A: [], B: [], C: [] }))
  const names = Object.keys(folders)

  // Filter files inside the active folder
  const files = useMemo(() => {
    const arr = folders[active] || []
    return arr.filter(f => (f.name || '').toLowerCase().includes(fileSearch.toLowerCase()))
  }, [fileSearch, active, folders])

  function renameFolder(oldName) {
    const name = prompt('Rename folder to:', oldName)
    if (!name || name === oldName) return
    if (folders[name]) { alert('Folder name already exists'); return }
    const nf = { ...folders }
    nf[name] = nf[oldName]
    delete nf[oldName]
    save('notiva_folders', nf)
    setFolders(nf)
    setActive(name)
  }

  function contextHandler(e, name) {
    e.preventDefault()
    renameFolder(name)
  }

  return (
    <div>
      <div className="header">
        <div className="brand">Notiva</div>
        <div className="rightArea">
          <button className="smallBtn" onClick={onBack}>Back</button>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="title">Folders</div>
      </div>

      {/* 🔹 Global folder search */}
      <div className="searchWrap">
        <input
          className="searchInput"
          placeholder="Search folders…"
          value={folderSearch}
          onChange={e => setFolderSearch(e.target.value)}
        />
      </div>

      <div className="folderList">
        {names
          .filter(name => name.toLowerCase().includes(folderSearch.toLowerCase()))
          .map(name => (
            <div
              key={name}
              className="folderCard"
              onClick={() => setActive(name)}
              onContextMenu={(e) => contextHandler(e, name)}
              style={{ outline: active === name ? '2px solid var(--accent)' : 'none' }}
              title="Right-click to rename"
            >
              <div style={{ fontSize: 18, marginBottom: 6 }}>📁 {name}</div>
              <span className="badge">{folders[name].length} items</span>
            </div>
          ))}
      </div>

      <div className="card">
        <div className="title" style={{ marginBottom: 10 }}>Folder {active}</div>
        
        {/* 🔹 File search (inside folder) */}
        <input
          className="searchInput"
          placeholder={`Search in folder ${active}…`}
          value={fileSearch}
          onChange={e => setFileSearch(e.target.value)}
        />
      </div>

      <div className="files">
        {files.map((f, i) => (
          <div key={i} className="fileItem">
            📄 <a href={f.url} target="_blank" rel="noreferrer" style={{ marginLeft: 8 }}>{f.name}</a>
            <div className="meta">from: {f.from || 'unknown'} · {f.mime || 'file'}</div>
          </div>
        ))}
        {files.length === 0 && <div className="meta" style={{ margin: '14px 18px' }}>No files in this folder yet.</div>}
      </div>
    </div>
  )
}

