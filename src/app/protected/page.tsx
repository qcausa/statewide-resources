'use client'

import { useEffect, useState } from 'react'

import { ConnectKitButton } from 'connectkit' // or any other wallet connection button you prefer
import { hasERC1155Token } from '~/lib/erc1155'
import { useAccount } from 'wagmi'

export default function ProtectedPage() {
  const { address, isConnected } = useAccount()
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // These constants come from your provided details:
  const CONTRACT_ADDRESS = '0xd07dc4262bcdbf85190c01c996b4c06a461d2430'
  const TOKEN_ID = 730724

  useEffect(() => {
    async function checkAccess() {
      if (!address) return

      setLoading(true)
      const result = await hasERC1155Token(address, CONTRACT_ADDRESS, TOKEN_ID)
      setHasAccess(result)
      setLoading(false)
    }

    if (isConnected && address) {
      checkAccess()
    }
  }, [isConnected, address])

  if (!isConnected) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Please Connect Your Wallet</h2>
        <ConnectKitButton />
      </div>
    )
  }

  if (loading) {
    return <p>Verifying token ownership...</p>
  }

  return hasAccess ? (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Protected Content</h1>
      <p>You have access because you own the required ERC-1155 token.</p>
    </div>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Access Denied</h1>
      <p>
        Unfortunately, you do not own the required token (
        <code>{TOKEN_ID}</code>) at{' '}
        <code>{CONTRACT_ADDRESS}</code> to view this content.
      </p>
    </div>
  )
}
