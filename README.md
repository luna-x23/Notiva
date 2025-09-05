# Notiva

Notiva is a simple yet powerful file and chat organizer that helps users manage their documents faster and more efficiently.  
It combines **chat-like conversations** with a **folder-based file system**, making it easier to react, share, and organize files in real-time.  

---

## ✨ Features
- 📂 **Organize Files into Folders** (A, B, C or create new ones).  
- 💬 **Chat-based Interaction** – share files, react with emojis, reply instantly.  
- 📑 **PDF & Document Support** – upload, view, and categorize study materials, work files, or notes.  
- ⚡ **Fast & Simple** – fewer steps compared to traditional file organizers.  
- 🌐 **Neon UI** – modern glowing interface that is visually appealing.  

---

## 🎯 Importance
- 👨‍🎓 **Students** – organize study materials, exam notes, and PDFs for faster exam prep.  
- 🏢 **Working Professionals & Officials** – keep reports, meeting files, and important docs sorted.  
- 🏫 **Schools & Teachers** – manage assignments, exam sheets, and digital resources in one place.  
- 💡 Overall, it’s better than a normal doc organizer as it adds **chat + file management**, reducing effort and saving time.  

---

## 🚀 Live Demo
👉 [Click here to view Notiva](https://luna-x23.github.io/Notiva/)

---

## 📸 Screenshots  
🔹 **Contacts Page**  
<img width="1344" height="614" alt="contacts" src="https://github.com/user-attachments/assets/918d4991-d780-48ef-878a-6c54c467c240" />  

🔹 **Chat Page**  
<img width="1364" height="641" alt="chat" src="https://github.com/user-attachments/assets/0d5d42ff-dffe-4818-bdd3-12f060a6c357" />  

🔹 **Folder View**  
<img width="1361" height="624" alt="folders" src="https://github.com/user-attachments/assets/6afe8ec4-a159-412f-a3c7-f83f51fd7e5f" />  

---

## 🛠️ Tech Stack  
- ⚛️ **React (Vite)** – Frontend  
- 🔥 **Firebase (Auth, Firestore, Storage)** – Authentication & file storage  
- 🎨 **CSS (Custom Neon Theme)** – Styling  
- 📦 **gh-pages** – Deployment  

---

## 📂 Folder Structure  

Notiva/
│── frontend/ # React frontend
│ ├── public/ # Static assets
│ ├── src/ # Source code
│ │ ├── App.jsx # Main App component
│ │ ├── Chat.jsx # Chat page
│ │ ├── Contacts.jsx # Contacts page
│ │ ├── FolderView.jsx # Folder management
│ │ ├── firebase.js # Firebase setup (move keys to .env for safety)
│ │ ├── styles.css # Global styles
│ │ ├── utils.js # Helpers (localStorage, seed data)
│ │ ├── data.js # Sample default data
│ ├── index.html # Root HTML
│ ├── vite.config.js # Vite config
│
├── .gitignore # Ignore node_modules, dist, .env etc.
├── package.json # Dependencies & scripts
├── package-lock.json # Lock file
└── README.md # Project documentation

yaml
Copy code

---

## ⚡ Installation & Setup  

### Prerequisites  
Make sure you have **Node.js** (v16+) and **npm** installed.  
👉 [Download Node.js here](https://nodejs.org/)  

---

### Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/luna-x23/Notiva.git
   cd Notiva/frontend
Install dependencies

bash
Copy code
npm install
Run locally

bash
Copy code
npm run dev
App will start at:
👉 http://localhost:5173/

Deployment (GitHub Pages)
Build the project

bash
Copy code
npm run build
Deploy to GitHub Pages

bash
Copy code
npm run deploy
Your app will be live at:
👉 https://<your-username>.github.io/Notiva/


