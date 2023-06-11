import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
// import SIdebar from '../Sidebar/SIdebar'
// import Dropdown from '../Dropdown/Dropdown'
import { useEffect } from 'react'
import Button from '../button/Button'
import '../../constants/fonts.css'
// import { BsDatabaseExclamation } from 'react-icons/bs'
import Dropdowns from '../Dropdown/Dropdowns'
import Dropdown from '../Dropdown/Dropdown'

const Reading = () => {

    const [surahRea, setSurahRea] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState('DrMohsinKhan');
    const [selectedSurahNumber, setSelectedSurahNumber] = useState("");
    const [selectedSurahName, setSelectedSurahName] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const surahNumber = queryParams.get('surahNumber');
        // const surahName = queryParams.get('surahName');
        setSelectedSurahNumber(Number(surahNumber));
        // setSelectedSurahName(`سُورَةُ ${surahName}`);
      }, [location]);

    useEffect(() => {
        setIsLoading(true); // Start loading
        fetch(`http://localhost:5000/api/quran/surah/${selectedSurahNumber}/${selectedAuthor}`)
          .then((res) => res.json())
          .then((data) => {
            setSurahRea(data);
            setIsLoading(false); // Stop loading
          });
      }, [selectedSurahNumber, selectedAuthor]);

    const handleAuthorSelect = (authorName) => {
        setSelectedAuthor(authorName);


    };

    const handleSurahSelect = (surahNumber,surahName) => {
        setSelectedSurahNumber(surahNumber);
        setSelectedSurahName(surahName);
      };

    return (

        <>
            <Navbar />
            <Header />
            <div className='flex mr-20'>
                {/* <SIdebar /> */}
                <div className='flex w-1/4 sticky top-0 h-screen bg-white shadow-lg mr-44'>
                    {/* <div className='w-2/3 h-fit border border-slate-200 p-4 mt-10 ml-4 rounded'>
            Search Surah
        </div> */}
                    <Dropdown onSurahSelect={handleSurahSelect}/>


                    <div className='mt-8'>
                    </div>
                </div>

                <div className='flex flex-col w-4/6 mt-10'>
                    <Dropdowns onAuthorSelect={handleAuthorSelect} />

                    <div className='flex justify-center items-center mt-6'>
                            <span className="font-[CustomFontName] text-4xl">{selectedSurahName}</span>
                        </div>
                    <div className='flex w-full bg-white mt-10'>

                        <div>
                            <span className="">{`Translation By ${selectedAuthor}`}</span>
                        </div>

                    </div>

                    {isLoading ? ( // Show loading state while fetching data
            <div className="flex justify-center items-center w-full h-40">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : (

                    
                        surahRea?.ayahs.map((surahnum) => (
                            <div className='flex flex-col justify-center items-center w-full bg-white shadow-md mt-10 border border-gray-200'>

                                <p className='m-8 leading-[3rem] font-[CustomFontName] text-3xl tracking-wide'>
                                    {
                                        surahnum.arabicText
                                    }
                                </p>
                                <div className='flex justify-center items-center flex-row w-full '>
                                    <div className='w-1/3 h-px bg-gray-200'>

                                    </div>
                                    <div className='m-2'>
                                        {surahnum.ayahNo}
                                    </div>
                                    <div className='w-1/3 h-px bg-gray-200'>

                                    </div>
                                </div>
                                <div className='m-4'>
                                    {surahnum.translation}
                                </div>
                            </div>
                        ))
                        //     :
                        //     "Loading..."
                        // } 
                    )}
                

                    <div className='flex justify-between items-center w-full mt-20 '>
                        <Button name="Previous" />
                        <Button name="Next Surah" />
                    </div>


                </div>

            </div>
        </>
    )
}

export default Reading