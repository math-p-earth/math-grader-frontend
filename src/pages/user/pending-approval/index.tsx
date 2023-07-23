import { useRouter } from 'next/router'

import { Button, Paper, Typography, styled } from '@mui/material'

import { PageContainer } from '../../../components/containers/PageContainer'
import { useUserLegacy } from '../../../hooks/useUserLegacy'

const FlexContainer = styled(Paper)`
  margin: auto;

  padding: ${({ theme }) => theme.spacing(4)};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

export default function PendingApprovalPage() {
  const { user, signOut } = useUserLegacy()
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
