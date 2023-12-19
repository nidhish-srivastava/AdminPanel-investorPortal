
// function Button({classname,children,onClick}) {
//   return (
//     <button className={`rounded-lg bg-blue-600 w-[90%] p-4 flex-shrink-0 text-white text-center text-lg font-semibold ${classname ? classname : ""}`} onClick={onClick}>
//         {children}
//     </button>
//   )
// }

// export default Button

import { classNames } from "@/utils";

export default function Button({
  disable,
  className,
  overrideClassNames = false,
  children,
  ...restProps
}) {
  let defaultClassName =
    "inline-flex items-center flex-1 justify-center rounded-lg bg-blue-600 w-[70%] py-3 flex-shrink-0 text-white text-center text-[1.1rem] font-semibold"
  !disable
    ? null
    : (defaultClassName += disable
        ? " cursor-not-allowed "
        : " cursor-pointer");


  return (
    <button
      className={
        overrideClassNames ? className : classNames(defaultClassName, className)
      }
      disabled={disable}
      {...restProps}
    >
      {children}
    </button>
  );

}
