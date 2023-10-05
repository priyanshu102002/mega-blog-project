import React, { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { label, className = " ", options, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={`${className}`}></label>}
      <select
        name=""
        {...props}
        id={id}
        ref={ref}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none w-full border border-gray-200 focus:bg-gray-50 duration-200`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
