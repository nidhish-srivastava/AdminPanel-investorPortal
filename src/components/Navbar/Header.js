import Hamburger from "./HamburgerModal"

function Header() {
  return (
    <>
      <Hamburger />
      <header className="flex items-center gap-2 p-4 relative -z-[1] rounded-b-lg bg-blue-700 shadow-md">
        <h2 className="font-semibold text-white">
          Admin Panel
        </h2>
      </header>
    </>
  )
}

export default Header