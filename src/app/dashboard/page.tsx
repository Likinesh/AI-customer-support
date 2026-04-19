import Dashboard from '@/components/Dashboard';
import { getSession } from '@/lib/getSession'
import React from 'react'

const DashboardPage = async () => {
  const session = await getSession();
  return (
    <>
    <Dashboard ownerId={session?.user?.id!}/>
    </>
  )
}

export default DashboardPage
