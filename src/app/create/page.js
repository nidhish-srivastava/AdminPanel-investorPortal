import Button from "@/components/Button"
import BottomNavBar from "@/components/Navbar/BottomNavbar"
import Link from "next/link"

function Create() {
  return (
    <>
    <main className="flex flex-col justify-center items-center gap-4 min-h-screen">
        <Link href={`/create-project`}>
        <Button className={`w-[20rem]`}>Create Project</Button>
        </Link>
        <Link href={`/create-account`}>
        <Button className={`w-[20rem]`}>Create Account for Investor</Button>
        </Link>
    </main>
    <BottomNavBar/>
    </>
  )
}

export default Create