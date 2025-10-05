```
🧠 Nexi AI Chatbot

Nexi AI Chatbot is a full-stack AI-powered chat assistant built with React, Node.js, and Express, using OpenAI’s GPT models for intelligent responses.

🚀 Features

💬 Real-time AI chat interface

🎨 Modern and responsive UI (built with React + Tailwind CSS)

⚡ Fast and simple Node.js + Express backend

🔒 Secure .env for API keys

🔁 Auto-scroll chat interface

🧩 Modular structure (frontend & backend separated)


🏗️ Project Structure

NEXI-AI-CHATBOT/
│
├── backend/              # Express server and OpenAI API integration
│   ├── server.js
│   ├── package.json
│   └── .env (not pushed to GitHub)
│
├── frontend/             # React app (user interface)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   └── ChatMessage.jsx
│   │   └── App.jsx
│   ├── package.json
│
└── .gitignore            # Ignores node_modules, .env, build, etc.


⚙️ Setup Instructions

1️⃣ Clone the repository
git clone https://github.com/<your-username>/NEXI-AI-CHATBOT.git
cd NEXI-AI-CHATBOT

2️⃣ Install dependencies
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

3️⃣ Set up environment variables
In the backend folder, create a .env file:
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000

⚠️ Don’t push your .env file — it’s already in .gitignore.

▶️ Run the project
Start the backend:
cd backend
npm run dev

Start the frontend:
cd ../frontend
npm run dev

Now open your browser at 👉 http://localhost:5173
 (or the port Vite shows).

🧩 Tech Stack
. Frontend: React, Tailwind CSS, Heroicons
. Backend: Node.js, Express
. AI Engine: OpenAI API (GPT models) 

📜 License
This project is open-source under the MIT License — free to use, modify, and distribute.

🧑‍💻 Author
AntolTECHS
📧 techeckmate254@gmail.com
