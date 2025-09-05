// LocalStorage helpers -----------------------------------------
export function load(key, fallback){
  try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch{ return fallback }
}
export function save(key, value){
  localStorage.setItem(key, JSON.stringify(value))
}

// Seed default data (contacts, folders, default messages)
export function seedOnce(){
  const seeded = load('notiva_seeded', false)
  if(seeded) return

  // Default folders
  save('notiva_folders', { A:[], B:[], C:[] })

  // Contacts
  save('notiva_contacts', [
    { id:'mom',  name:'Mom'  },
    { id:'dad',  name:'Dad'  },
    { id:'sachin', name:'Sachin' },
    { id:'john', name:'John' },
  ])

  // Messages for Mom: default text + default PDF file
  const pdfUrl = '/default.pdf' // file placed in public/
  const threads = {
    mom: [
      {
        id:'m1',
        from:'mom', type:'text', text:'Hi, what are you doing?',
        ts: Date.now()-1000*60*60
      },
      {
        id:'m2',
        from:'mom', type:'file',
        file:{ name:'default.pdf', url: pdfUrl, mime:'application/pdf', size:0 },
        ts: Date.now()-1000*50
      }
    ]
  }
  save('notiva_threads', threads)

  save('notiva_seeded', true)
}

// Generate an id
export const uid = () => Math.random().toString(36).slice(2,10)

// Format time (very small helper)
export const time = (ts)=> new Date(ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})

