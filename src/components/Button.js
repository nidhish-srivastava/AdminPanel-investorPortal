
import { classNames } from "@/utils";

export default function Button({
  disable,
  className,
  overrideClassNames = false,
  children,
  onClick,
  ...restProps
}) {
  let defaultClassName =
    "rounded-[14px] bg-violet-700 p-[.8rem] text-white text-center text-[17px] font-semibold"
  !disable
    ? null
    : (defaultClassName += disable
        ? " cursor-not-allowed opacity-80"
        : " cursor-pointer");


  return (
    <button
      className={
        overrideClassNames ? className : classNames(defaultClassName, className)
      }
      onClick={onClick}
      disabled={disable}
      {...restProps}
    >
      {children}
    </button>
  );

}
