'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from './button'

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button variant="ghost" size="icon" className="group bg-sitora-primary-light hover:bg-sitora-primary shadow-none" aria-label="Toggle theme" onClick={handleThemeChange}>
            {theme === 'dark' ? <Sun className="text-sitora-primary group-hover:text-sitora-white h-4 w-4" /> : <Moon className="text-sitora-primary group-hover:text-sitora-white h-4 w-4" />}
        </Button>
    )
}
