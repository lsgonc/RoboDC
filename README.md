
# 🤖 RoboDC – Socially Assistive Robot

RoboDC is a **socially assistive robot** built with **Ionic Framework** to monitor and support the well-being of students at **Federal University of São Carlos (UFSCar)**.  
It leverages a **Large Language Model (LLM)** to **detect users’ emotions** and provide:  

- 💡 **Well-being tips**  
- 🧑‍⚕️ **Guidance to seek professional help**  
- 🎓 **Information on university resources**  

This project also includes a **custom Design System** and **component library**:  
👉 [RoboDC UI](https://lsgonc.github.io/robodc-ui/)  

---

## 📦 Prerequisites

Make sure you have installed:  

- [Node.js](https://nodejs.org/) >= 16  
- [Ionic CLI](https://ionicframework.com/docs/cli)  
- [Git](https://git-scm.com/)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

---

## ⚡ Installation & Setup

This project depends on a **custom component library** that must be **built and linked** before running the Ionic app.

### 1️⃣ Clone the repositories

```bash
# Clone the main project
git clone https://github.com/lsgonc/RoboDC.git
cd RoboDC

# Clone the component library
git clone https://github.com/lsgonc/robodc-ui.git
```

---

### 2️⃣ Build the library

Navigate to the library folder and install dependencies:

```bash
cd robodc-ui
npm install
```

Build the library:

```bash
npm run build
```

Create a global npm link:

```bash
npm link
```

---

### 3️⃣ Link the library to the Ionic project

In the Ionic project folder:

```bash
cd ../RoboDC
npm install
npm link robodc-ui
```

---

### 4️⃣ Run the Ionic app

Start the development server:

```bash
ionic serve
```

The app will be available at:  
**http://localhost:8100**

---

## 🛠️ Useful Scripts

Inside the Ionic project folder:  

```bash
# Start in development mode
ionic serve

# Build for production
ionic build

# Clean cache and reinstall dependencies
rm -rf node_modules && npm install
```

---

## 🎨 Preview

| Home | Emotion Detection | Recommendations |
|------|------------------|-----------------|
| ![Home](https://via.placeholder.com/300x200) | ![Emotions](https://via.placeholder.com/300x200) | ![Tips](https://via.placeholder.com/300x200) |

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, study, and contribute!  
