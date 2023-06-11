import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Dropdown = ({ onSurahSelect }) => {
  const [surah, setSurah] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");

 
  useEffect(() => {
    fetch("http://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
       
        setSurah(data);
      });
    
  },[]);

  return (
    <div className="w-56 overflow-y-auto scrollbar-thin flex flex-col font-medium ml-6 mt-6">
      <div
  
        className={`w-full p-2 flex items-center justify-between bg-gray-300 rounded ${!selected && "text-gray-700"
          }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select Surah"}
        {/* <BiChevronDown size={20} className={`${open && "rotate-180"}`} /> */}
      </div>
      {surah ? 
      <ul
        className={`bg-white w-56 mt-10 `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={30} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter Surah name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
         
        {surah.data.map((para) => (
          <li
          key={para.englishName}
          className={`p-2 text-sm hover:bg-[#97fed9] hover:text-black
          ${
            para.englishName.toLowerCase() === selected?.toLowerCase() &&
            "bg-[#00A86B] text-white"
          }
          ${
            para.englishName.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
          }`}
          onClick={() => {
            if ( para.englishName.toLowerCase() !== selected.toLowerCase()) {
              setSelected( para.englishName);
             setInputValue("");
            }
            onSurahSelect(para.number,para.name);
          }}
          >
               
          <div className="flex flex-row gap-8 font-thin ">
          <div>
              {para.number}
            </div>
            <div>
              {para.englishName}
            </div>
            
          </div>
          </li>

         
          ))}
          
    </ul>
     : 
      "Loading...."
    }
      </div >
  );
};

export default Dropdown;