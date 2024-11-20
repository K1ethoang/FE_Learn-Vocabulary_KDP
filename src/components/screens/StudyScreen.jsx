import { ArrowLeftOutlined, ArrowRightOutlined, BlockOutlined, FormOutlined, ReadOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import FlipCard from '../cards/FlipCard';

const StudyScreen = () => {
    const { id } = useParams();
    const carouselRef = useRef(null);

  const handleNext = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  const handlePrev = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };
    return (
        <div>
            <div className='text-3xl font-bold'>
                Title of Course id: {id}
            </div>

            <div className='m-5  flex items-center justify-between'>
                <Button icon={<SnippetsOutlined style={{color:'#0b1de0'}}/>} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Thẻ ghi nhớ</Button>
                <Button icon={<FormOutlined  style={{color:'#0b1de0'}}/>} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Học</Button>
                <Button icon={<ReadOutlined style={{color:'#0b1de0'}} />} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Kiểm tra</Button>
                <Button icon = {<BlockOutlined style={{color:'#0b1de0'}}/>} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Ghép thẻ</Button>
            </div>


            <div>
                <Carousel ref={carouselRef} infinite={false}>
                    <div>
                        <FlipCard/>
                    </div>
                    <div>
                        <FlipCard/>
                    </div>
                    <div>
                        <FlipCard/>
                    </div>
                    <div>
                        <FlipCard/>
                    </div>
                </Carousel>

                <div className='flex  justify-around ml-10'>
                    <Button icon={<ArrowLeftOutlined />} type="primary" onClick={handlePrev} style={{ marginTop: "20px", width:'100px', height:'50px' }} />
                    <Button icon={<ArrowRightOutlined />} type="primary" onClick={handleNext} style={{ marginTop: "20px", width:'100px', height:'50px' }} />
                </div>
            </div>
        </div>
    )
}

export default StudyScreen
