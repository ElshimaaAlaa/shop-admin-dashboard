import React from "react";
import { Pencil } from "lucide-react";
import { AiFillEdit } from "react-icons/ai";

function EditDiscount() {
  return (
    <div>
      <button className="h-6 w-6 p-1">
        <AiFillEdit size={20} className=" text-[#E6A86C]" />
      </button>
      
    </div>
  );
}

export default EditDiscount;
