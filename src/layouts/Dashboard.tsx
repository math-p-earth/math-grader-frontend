import { Sidebar } from './components/Sidebar'

const _excludedRoutes = ['/login', '/user/pending-approval', '/user/register-success']

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="flex-grow bg-zinc-700 p-12 pl-72">{children}</main>
    </div>
  )
}
