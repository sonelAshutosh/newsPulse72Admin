import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next'

function NavLink({ to, children }) {
  return (
    <Link href={to} className={`mx-4`}>
      {children}
    </Link>
  )
}

function MobileNav({ open, setOpen }) {
  const router = useRouter()
  const handleLogout = () => {
    deleteCookie('accessToken')
    deleteCookie('userId')
    router.reload()
  }
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? '-translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20 ">
        {' '}
        {/*logo container*/}
        <Link className="text-xl font-semibold" href="/">
          News Pulse 72 Admin
        </Link>
      </div>
      <div className="flex flex-col ml-4">
        <Link
          className="text-xl font-medium my-4"
          href="/admin/allNews"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open)
            }, 100)
          }
        >
          All News
        </Link>
        <Link
          className="text-xl font-normal my-4"
          href="/admin/verified"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open)
            }, 100)
          }
        >
          Verified
        </Link>
        <Link
          className="text-xl font-normal my-4"
          href="/admin/notVerified"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open)
            }, 100)
          }
        >
          Not Verified
        </Link>
        <button className="my-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    deleteCookie('accessToken')
    deleteCookie('userId')
    router.reload()
  }

  return (
    <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <a className="text-2xl font-semibold" href="/">
          Admin
        </a>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open)
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? 'rotate-45 translate-y-3.5' : ''
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-full'
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? '-rotate-45 -translate-y-3.5' : ''
            }`}
          />
        </div>

        <div className="hidden md:flex">
          <NavLink to="/admin/allNews">All News</NavLink>
          <NavLink to="/admin/verified">Verified</NavLink>
          <NavLink to="/admin/notVerified">Not Verified</NavLink>
          <button className="mx-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
