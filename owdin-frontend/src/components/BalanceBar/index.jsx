import React from 'react'

const BalanceBar = () => {
    const { owe, total, owed } = { owe: 20, total: 30, owed: 50 }
    return (
        <nav className='flex py-3 px-6 text-sm font-bold justify-between items-center'>
            <div className='flex flex-col items-center font-semibold text-gray-500'>
                <span>You owe</span>
                <span className={`text-lg ${owe>0?'text-red-600':''}`}>{owe}</span>
            </div>
            <div className='flex flex-col items-center font-semibold text-gray-500'>
                <span>Total Balance</span>
                <span className={`text-lg ${total>0?'text-green-600':''} ${total<0?'text-red-600':''}`}>{total}</span>
            </div>
            <div className='flex flex-col items-center font-semibold text-gray-500'>
                <span>You are owed</span>
                <span className={`text-lg ${owed>0?'text-green-600':''}`}>{owed}</span>
            </div>

        </nav>
    )
}

export default BalanceBar