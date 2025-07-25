# 🎯 Valorant Draft Wheel

🌐 Live Demo → valo-draft.vercel.app

> Generate fair, role‑balanced Valorant teams in seconds – with slick animations and full customisation.

---

## ✨ Why?

When you gather friends for a quick Valorant match, picking roles & agents can take longer than the actual game. **Valorant Draft Wheel** lets you:

* pick *any* team size (3‑10 players)
* decide exact **role quotas** ("2 Duelists, 1 Initiator… the rest Flex")
* optionally assign **totally random agents** – or keep agents role‑restricted
* watch a stylish spinning loader, then view the final roster in animated cards

All logic runs client‑side – no accounts, no servers, no waiting.

---

## 🛠️ Tech Stack

| Area         | Lib / Tool                            | Notes                           |
| ------------ | ------------------------------------- | ------------------------------- |
| UI framework | **React 18 + Vite**                   | blazing‑fast dev server         |
| State        | **Zustand**                           | tiny, hook‑based store          |
| Animations   | **Framer Motion 10**                  | loader spin + scene transitions |
| Styling      | **CSS Modules**                       | fully refactored; zero Tailwind |
| Utility      | Custom `shuffle & uniquePick` helpers | repeat‑safe randomisation       |
| Language     | TypeScript                            | end‑to‑end type‑safety          |

---

## 📂 Project Structure (truncated)

```txt
src/
 ├─ assets/                 # images, logo
 ├─ components/
 │   ├─ Config/             # RoleConfigForm wizard
 │   ├─ NicknameForm/
 │   ├─ Wheel/              # Loader (spinning ring)
 │   └─ Results/
 ├─ constants/              # roles & agent lists
 ├─ store/                  # Zustand gameStore.ts
 ├─ utils/                  # shuffle, pickUniqueAgent
 ├─ App.tsx                 # routes scenes via AnimatePresence
 └─ styles/                 # reset.css
```

---

## 🚀 Quick Start

```bash
# 1. Clone
$ git clone https://github.com/Enver-Onur-Cogalan/React-valorant-random.git
$ cd valorant-draft-wheel

# 2. Install deps
$ npm install   

# 3. Run dev server
$ npm run dev     
```

---

## 🤝 Contributing

1. Fork the repo & create your branch: `git checkout -b feature/name`
2. Commit your changes: `git commit -am "feat: ..."`
3. Push & open a Pull Request
