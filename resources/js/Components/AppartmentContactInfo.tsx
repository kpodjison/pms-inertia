import React from 'react'

export default function AppartmentContactInfo({title,info}) {
  return (
    <div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex flex-row items-center gap-4">{title}:</div>
              <p className="font-medium">{ info }</p>
      </div>
      <hr className="my-2" />
    </div>
  );
}
