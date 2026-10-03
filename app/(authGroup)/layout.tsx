import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className='bg-gray-500'>
        {children}
    </div>
}

export default DashboardLayout 