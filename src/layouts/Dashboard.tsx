import { Sidebar } from './components/Sidebar'

const _excludedRoutes = ['/login', '/user/pending-approval', '/user/register-success']

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <main className="bg-zinc-700 flex-grow p-12 pl-72">{children}</main>
    </div>
  )
}
