import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

import { useUser } from '../../../hooks/useUser'
import { FlexContainer, PageContainer } from './styled'

export default function PendingApprovalPage() {
  const { user, signOut } = useUser()
  const router = useRouter()
  if (!user) {
    router.push('/login')
    return null
  }
  if (user.status === 'APPROVED') {
    router.push('/')
    return null
  }

  return (
    <PageContainer>
      <FlexContainer>
        <Typography variant="h4" color={'white'}>
          You are logged in as {user.firstName} {user.lastName}.
        </Typography>
        <Typography variant="body1" color={'white'}>
          However, your account has not been approved yet. Please contact an administrator to gain
          access.
        </Typography>
        <Button size="small" variant="contained" color="error" onClick={signOut}>
          Sign out
        </Button>
      </FlexContainer>
    </PageContainer>
  )
}
