import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useFilters } from '@/contexts/filters-context'

interface ToursFilterProps {
    categories: string[]
}

const ToursSidebar = ({ categories }: ToursFilterProps) => {
    const t = useTranslations('pages.tours')
    const { state, setSelectedCategory, setPriceRange, setDurationRange, resetFilters, hasActiveFilters, activeFiltersCount } = useFilters()

    const [expandedSections, setExpandedSections] = useState({
        filterBy: true,
        price: true,
        length: true,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const handleCategoryChange = (category: string, checked: boolean) => {
        setSelectedCategory(checked ? category : null)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Filter By */}
            <Card className="bg-card border-border rounded-2xl border">
                <CardHeader className="cursor-pointer px-4 py-3 sm:px-6 sm:py-4" onClick={() => toggleSection('filterBy')}>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-copy text-sm font-semibold sm:text-base">{t('sidebar.filterBy')}</CardTitle>
                        {expandedSections.filterBy ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                </CardHeader>
                {expandedSections.filterBy && (
                    <CardContent className="space-y-2 px-4 pb-3 sm:px-6 sm:pb-4">
                        {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox id={category} className="h-5 w-5" checked={state.selectedCategory === category} onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)} />
                                <Label htmlFor={category} className="text-copy-lighter text-sm font-normal">
                                    {category}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                )}
            </Card>

            {/* Price */}
            <Card className="bg-card border-border rounded-2xl border">
                <CardHeader className="cursor-pointer px-4 py-3 sm:px-6 sm:py-4" onClick={() => toggleSection('price')}>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-copy text-sm font-semibold sm:text-base">{t('sidebar.price')}</CardTitle>
                        {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                </CardHeader>
                {expandedSections.price && (
                    <CardContent className="space-y-2 px-4 pb-3 sm:px-6 sm:pb-4">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label htmlFor="min-price" className="text-copy-lighter text-sm font-normal">
                                    {t('sidebar.min')}
                                </Label>
                                <Input
                                    id="min-price"
                                    type="number"
                                    value={state.priceRange.min || ''}
                                    onChange={(e) => {
                                        const value = Math.max(0, parseInt(e.target.value) || 0)
                                        if (value <= state.priceRange.max) {
                                            setPriceRange({ min: value, max: state.priceRange.max })
                                        }
                                    }}
                                    placeholder="0"
                                    className="rounded-xl text-sm"
                                    min={0}
                                    max={state.priceRange.max}
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="max-price" className="text-copy-lighter text-sm font-normal">
                                    {t('sidebar.max')}
                                </Label>
                                <Input
                                    id="max-price"
                                    type="number"
                                    value={state.priceRange.max || ''}
                                    onChange={(e) => {
                                        const value = Math.max(state.priceRange.min, parseInt(e.target.value) || 0)
                                        setPriceRange({ min: state.priceRange.min, max: value })
                                    }}
                                    placeholder="0"
                                    className="rounded-xl text-sm"
                                    min={state.priceRange.min}
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Length */}
            <Card className="bg-card border-border rounded-2xl border">
                <CardHeader className="cursor-pointer px-4 py-3 sm:px-6 sm:py-4" onClick={() => toggleSection('length')}>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-copy text-sm font-semibold sm:text-base">{t('sidebar.duration')}</CardTitle>
                        {expandedSections.length ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                </CardHeader>
                {expandedSections.length && (
                    <CardContent className="space-y-2 px-4 pb-3 sm:px-6 sm:pb-4">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label htmlFor="min-length" className="text-copy-lighter text-sm font-normal">
                                    {t('sidebar.min')}
                                </Label>
                                <Input
                                    id="min-length"
                                    type="number"
                                    value={state.durationRange.min || ''}
                                    onChange={(e) => {
                                        const value = Math.max(0, parseInt(e.target.value) || 0)
                                        if (value <= state.durationRange.max) {
                                            setDurationRange({ min: value, max: state.durationRange.max })
                                        }
                                    }}
                                    placeholder="0"
                                    className="rounded-xl text-sm"
                                    min={0}
                                    max={state.durationRange.max}
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="max-length" className="text-copy-lighter text-sm font-normal">
                                    {t('sidebar.max')}
                                </Label>
                                <Input
                                    id="max-length"
                                    type="number"
                                    value={state.durationRange.max || ''}
                                    onChange={(e) => {
                                        const value = Math.max(state.durationRange.min, parseInt(e.target.value) || 0)
                                        setDurationRange({ min: state.durationRange.min, max: value })
                                    }}
                                    placeholder="0"
                                    className="rounded-xl text-sm"
                                    min={state.durationRange.min}
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Reset Button */}
            <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={resetFilters} disabled={!hasActiveFilters} className="bg-primary-light text-primary-foreground hover:bg-primary-dark transition-colors duration-200">
                    {t('sidebar.reset')}
                </Button>
                {hasActiveFilters && <span className="text-sitora-body text-sm">{activeFiltersCount} filter(s) active</span>}
            </div>
        </div>
    )
}

export default ToursSidebar
