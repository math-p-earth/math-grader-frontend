import { Paper, styled } from '@mui/material'

export const PageContainer = styled('div')`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
`

export const FlexContainer = styled(Paper)`
  margin: auto;

  padding: ${({ theme }) => theme.spacing(4)};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`
