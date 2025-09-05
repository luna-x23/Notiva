import React, { useEffect, useMemo, useRef, useState } from 'react'
import { load, save, uid, time } from './utils.js'

const EMOJIS = ['👍','❤️','😂','😮','😢','🔥','➕']

export default function Chat({ contactId, onBack, openFolders }){
  const threads = load('notiva_threads', {})
  const [msgs, setMsgs] = useState(threads[contactId] || [])
  const [text, setText] = useState('')
  const [pickerFor, setPickerFor] = useState(null)  // message id for which action bar shows
  const [showFolderSheet, setShowFolderSheet] = useState(false)
  const sheetAttachRef = useRef(null)
  const scrollerRef = useRef(null)

  // Scroll to bottom whenever msgs change
  useEffect(()=>{
    scrollerRef.current?.scrollTo({top: 999999, behavior:'smooth'})
  }, [msgs.length])

  const contact = useMemo(()=>{
    const all = load('notiva_contacts', [])
    return all.find(c=> c.id === contactId) || {name:contactId}
  }, [contactId])

  function persist(next){
    const all = load('notiva_threads', {})
    all[contactId] = next
    save('notiva_threads', all)
    setMsgs(next)
  }

  function sendText(){
    if(!text.trim()) return
    const m = { id: uid(), from:'me', type:'text', text: text.trim(), ts: Date.now() }
    persist([ ...msgs, m ])
    setText('')
  }

  function onPickEmoji(mid, emoji){
    if(emoji === '➕'){
      // open folder picker for this message if it's a file; otherwise ignore
      const m = msgs.find(x=>x.id===mid)
      if(m?.type === 'file'){
        setPickerFor(null)
        setShowFolderSheet({ mid })
      }
      return
    }
    const next = msgs.map(m => m.id===mid ? {...m, reaction:emoji} : m)
    persist(next)
    setPickerFor(null)
  }

  function onFileSelected(file){
    const url = URL.createObjectURL(file)
    const m = {
      id: uid(),
      from:'me',
      type:'file',
      file:{ name:file.name, url, mime:file.type, size:file.size },
      ts: Date.now(),
    }
    persist([...msgs, m])
    setShowFolderSheet({ mid: m.id }) // Immediately allow to sort into folder
  }

  function handleContextOpen(e, mid){
    e.preventDefault()
    setPickerFor(mid)
  }

  // Save a file-message to a folder
  function saveToFolder(folderName, mid){
    const folders = load('notiva_folders', {A:[],B:[],C:[]})
    const m = msgs.find(x=>x.id===mid)
    if(!m || m.type!=='file') return
    const item = { name: m.file.name, url: m.file.url, mime: m.file.mime, from: contact.name }
    folders[folderName] = folders[folderName] || []
    folders[folderName].push(item)
    save('notiva_folders', folders)
    setShowFolderSheet(false)
  }

  function newFolder(){
    const folders = load('notiva_folders', {A:[],B:[],C:[]})
    let name = prompt('New folder name:', '')
    if(!name) return
    if(folders[name]){ alert('Folder already exists'); return }
    folders[name]=[]
    save('notiva_folders', folders)
    setShowFolderSheet(false)
  }

  return (
    <div className="chatWrap">
      <div className="header">
        <div className="brand">Notiva</div>
        <div className="rightArea">
          <button className="smallBtn" onClick={openFolders}>📁</button>
          <button className="signBtn" onClick={()=>{}}>Sign out</button>
        </div>
      </div>

      <div className="chatTop">
        <button className="backBtn" onClick={onBack}>←</button>
        <div className="title">{contact.name}</div>
      </div>

      <div className="messages" ref={scrollerRef}>
        {msgs.map(m => (
          <div key={m.id} className={`row ${m.from==='me' ? 'right' : 'left'}`}>
            <div
              className={`bubble ${m.from==='me' ? 'out' : 'in'}`}
              onContextMenu={(e)=>handleContextOpen(e,m.id)}
              onMouseDown={(e)=> {
                // long press (mobile-ish) – open action bar after 500ms
                let t = setTimeout(()=> setPickerFor(m.id), 500)
                const stop = () => { clearTimeout(t); document.removeEventListener('mouseup',stop); document.removeEventListener('touchend',stop) }
                document.addEventListener('mouseup', stop, {once:true})
                document.addEventListener('touchend', stop, {once:true})
              }}
            >
              {m.type==='text' && <div>{m.text}</div>}
              {m.type==='file' && (
                <div className="fileBubble">
                  <div>📄</div>
                  <div>
                    <a href={m.file.url} target="_blank" rel="noreferrer">{m.file.name}</a>
                    <div className="meta">{m.file.mime || 'file'}</div>
                  </div>
                </div>
              )}
              <div className="meta">{time(m.ts)} {m.reaction && <span> · {m.reaction}</span>}</div>

              {pickerFor===m.id && (
                <div className="actionBar">
                  {EMOJIS.map(e => (
                    <button className="reBtn" key={e} onClick={()=>onPickEmoji(m.id, e)}>{e}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="inputBar">
        <div className="inputInner">
          <input
            className="textbox"
            placeholder="Type message"
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyDown={e=> e.key==='Enter' ? sendText() : null}
          />
          <label className="attachBtn" title="Attach file">
            Attach
            <input
              ref={sheetAttachRef}
              type="file" accept="*/*" style={{display:'none'}}
              onChange={(e)=> {
                const f = e.target.files?.[0]
                if(f) onFileSelected(f)
                e.target.value = ''
              }}
            />
          </label>
          <button className="sendBtn" onClick={sendText}>➤</button>
        </div>
      </div>

      {showFolderSheet && (
        <div className="folderSheet">
          {Object.keys(load('notiva_folders', {A:[],B:[],C:[]})).map(n=>(
            <button key={n} className="fpBtn" onClick={()=>saveToFolder(n, showFolderSheet.mid)}>📁 {n}</button>
          ))}
          <button className="fpBtn" onClick={newFolder}>➕ New</button>
          <button className="fpBtn" onClick={()=>setShowFolderSheet(false)}>✖ Close</button>
        </div>
      )}
    </div>
  )
}

