import Link from "next/link"
import PrevIcon from "../Icons/PrevIconSvg"

function Header({ route, children }) {
  return (
    <div className="flex gap-2 px-2 mt-2 items-center">
      <Link href={`/${route ? route : ""}`}>
        <PrevIcon className="" />
      </Link>
      <h2 className="text-[18px] font-bold">{children}</h2>
    </div>
  )
}

export default Header