import EmbedClient from '@/components/EmbedClient';
import { getSession } from '@/lib/getSession'
import React from 'react'

const page = async () => {
    const session = await getSession();

    const ownerId = session?.user?.id || "default_owner_id";

  return (
    <>
     <EmbedClient ownerId={ownerId} /> 
    </>
  )
}

export default page
