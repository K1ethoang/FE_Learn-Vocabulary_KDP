import { ArrowLeftOutlined, ArrowRightOutlined, BlockOutlined, FormOutlined, ReadOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Button, Carousel, Skeleton } from 'antd';
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FlipCard from '../cards/FlipCard';
import ListWordComponent from '../words/ListWordComponent';
import data from  './../../assets/example_data/fake_data_word.json'


const StudyScreen = () => {
    const { id } = useParams();
    const carouselRef = useRef(null);
    const navigate = useNavigate()
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

  const accessFlashCard = () => {
    navigate('/flashcard/'+id)
  }
    return (
        <div className='m-6'>
            <div className='text-2xl font-bold '>
                Title of Course id: {id}
            </div>

            <div className='m-5  flex items-center justify-between'>
                <Button onClick={accessFlashCard} icon={<SnippetsOutlined style={{color:'#0b1de0'}}/>} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Thẻ ghi nhớ</Button>
                <Button icon={<FormOutlined  style={{color:'#0b1de0'}}/>} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Học</Button>
                <Button icon={<ReadOutlined style={{color:'#0b1de0'}} />} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Kiểm tra</Button>
                <Button icon = {<BlockOutlined style={{color:'#0b1de0'}}/>} style={{width:200, height:100, backgroundColor:'#f0f0f894', fontSize:18, fontWeight:600}}>Ghép thẻ</Button>
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

            <div className='m-14'>
                <span className='text-xl font-bold'>Thuật ngữ trong học phần này</span>
                <div className='mt-5 '>
                    <ListWordComponent/>
                </div>

            </div>
        </div>
    )
}

export default StudyScreen
