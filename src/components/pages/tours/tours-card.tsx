import React from 'react'

const ToursCard = ({ tour }: { tour: any }) => {
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">{tour.name}</h3>
                <p className="text-sm text-gray-500">{tour.description}</p>
            </div>
        </div>
    )
}

export default ToursCard
