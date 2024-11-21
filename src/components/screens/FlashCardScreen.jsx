import React, { useRef, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import data from  './../../assets/example_data/fake_data_word.json'
import { Button, Carousel, Skeleton } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseSquareOutlined, SnippetsOutlined } from '@ant-design/icons';
import FlipCard from './../cards/FlipCard'


const FlashCardScreen = () => {
    const { id } = useParams();
    const [count,setCount ] = useState(1)
    const length = data.length
    const navigate = useNavigate()
    const carouselRef = useRef(null);
    const handleNext = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
        if(count < 50){
            setCount(count+1)
        }
        carouselRef.current.next();
    }
  };
  const handlePrev = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
    if(count > 1 ){
            setCount(count-1)
    }
  };
  const goback = () => {
    navigate(-1)
  }
    return (
    <div className='m-6'>
        <div className=' font-bold flex items-center justify-between '>
            <div className='text-gray text-xl '>
                <SnippetsOutlined style={{color:'#0b1de0', marginRight:2}}/>
                Thẻ ghi nhớ
            </div>

            <div className='flex flex-col items-center'>
                <span className='text-2xl'>Title of Course id: {id}</span>
                <span className='text-xl text-center'>{count} / {length}</span>
            </div>


            <div className='w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-light border text-gray' onClick={goback}>X</div>
        </div>


         <div>
                <Carousel ref={carouselRef} infinite={false}>
                    {data? data.map((item, idx) => {
                        return(
                            <div key={idx}>
                                <FlipCard item={item}/>
                            </div>
                        )
                    }) : <Skeleton/>}


                </Carousel>

                <div className='flex  justify-around ml-10'>
                    <Button icon={<ArrowLeftOutlined />} type="primary" onClick={handlePrev} style={{ marginTop: "20px", width:'100px', height:'50px' }} />
                    <Button icon={<ArrowRightOutlined />} type="primary" onClick={handleNext} style={{ marginTop: "20px", width:'100px', height:'50px' }} />
                </div>
            </div>
    </div>
  )
}

export default FlashCardScreen
