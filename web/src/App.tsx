// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

import { Routes, Route } from "react-router-dom"

import { HomePage } from "@/pages/home.tsx";
import {Redirect} from "@/pages/redirect.tsx";
import {NotFound} from "@/pages/not-found.tsx";

function App() {
  return (
    <>
        <main className="h-dvh flex flex-col items-center justify-center">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:shortUrl" element={<Redirect />} />
            <Route path="/not-found" element={<NotFound />} />
        </Routes>
        </main>
    </>
  )
}

export default App
