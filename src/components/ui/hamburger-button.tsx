import { Button } from './button'
import { Menu, X } from 'lucide-react'

export const HamburgerButton = ({ active, setActive }: { active: boolean; setActive: (active: boolean) => void }) => {
    return (
        <Button variant="ghost" size="icon" onClick={() => setActive(!active)} className="group bg-sitora-primary-light hover:bg-sitora-primary relative z-50 shadow-none">
            {active ? <X className="text-sitora-primary group-hover:text-sitora-white h-4 w-4" /> : <Menu className="text-sitora-primary group-hover:text-sitora-white h-4 w-4" />}
        </Button>
    )
}
