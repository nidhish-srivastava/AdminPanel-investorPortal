import Hamburger from "./HamburgerModal"
import NotificationSvg from "../Icons/NotificationSvg"
import Link from "next/link"
function Header() {
  return (
    <>
      <Hamburger />
      <header className="flex items-center justify-between gap-2 p-4 relative rounded-b-lg bg-blue-700 shadow-md">
        <h2 className="font-semibold text-white">
          Admin Panel
        </h2>
        <Link href={`/notification`} className="mr-5">
          <NotificationSvg/>
        </Link>
      </header>
    </>
  )
}

export default Header