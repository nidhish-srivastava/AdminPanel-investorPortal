import Image from "next/image"
import BackArrow from "@/assets/arrow.png"
function PrevIcon(props) {
    const { setValue, number, className } = props
    return (
      <span onClick={setValue ? () => setValue(number) : null} className={`cursor-pointer text-[1.2rem] ${className}`}>
        <b>
          <Image
          src={BackArrow}
          alt="back-arrow"
          width={15}
          height={15}
          />
        </b>
      </span>
    )
  }
  
  export default PrevIcon