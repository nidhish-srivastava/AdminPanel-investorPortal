
function PrevIcon(props) {
    const { setValue, number, className } = props
    return (
      <span onClick={setValue ? () => setValue(number) : null} className={`cursor-pointer text-[1.2rem] ${className}`}>
        <b>
          {"<-"}
        </b>
      </span>
    )
  }
  
  export default PrevIcon