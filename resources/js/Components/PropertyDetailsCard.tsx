import React from 'react'

export default function PropertyDetailsCard({icon,name,info}) {
  return (
    <div>
      <div>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex flex-row items-center gap-4">
                      {icon} {name}:
          </div>
          <p>
            <small>
             {info}
            </small>
          </p>
        </div>
        <hr className="my-2" />
      </div>
    </div>
  );
}
