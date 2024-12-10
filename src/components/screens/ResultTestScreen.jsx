import React, { useState } from 'react'
import { questions } from '../../assets/example_data/questions_fake'
import {  Button, Col, Flex, message, Progress, Row } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const ResultTestScreen = () => {
    const lengthTest = questions.length

    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state;




    const getAllCorrectOption = questions.map((question) => {
        const correctOption = question.options.find(option => option.isCorrect); // Find the correct option
        return {
            idQues: question.id,
            correctOption: correctOption.id
        };
    });

    const countNumOfCorrect = data.map((ques, idx) => {
        let numOfCorrect = 0
        if(ques['ans'] === getAllCorrectOption[idx]['correctOption']){
            numOfCorrect ++
        }

        return numOfCorrect
    })

    const numOfCorrect = countNumOfCorrect.filter((c) => c == 1).length
    const percentCorrect = numOfCorrect / lengthTest *100;
    return (

        <div className='flex flex-col items-center w-full min-h-screen bg-[#f6f7fb]'>
            <div className='w-full min-h-16 bg-orange text-bg-light flex items-center justify-between p-3 mb-8'>
                <div>Kết quả kiểm tra</div>
                <div className='flex flex-col items-center'>
                    <span>Title of topic test</span>
                    <span>Số câu: {lengthTest}</span>
                </div>
                <div></div>
            </div>

            <Flex gap="small" wrap className='mb-10'>
                <Progress className='mr-10' type="circle" percent={percentCorrect} format={(percent) => `Đúng ${percent}%`}/>
                <Progress type="circle" percent={100 - percentCorrect} status="exception" format={(percent) => `Sai ${percent}%`} strokeColor='#ff7849' />
            </Flex>

            {
                questions.map((ques, quesIdx) => (
                    <div key={quesIdx} className='w-1/2 min-h-96 mb-5 bg-bg-light flex flex-col p-6 rounded-lg shadow-lg text-[#626380]'>
                        <div className='w-full'>
                            <div className='flex items-center justify-between mb-3  '>
                                <span className='text-sm font-bold'>Thuật ngữ</span>
                                <span>{quesIdx+1} / {lengthTest}</span>
                            </div>
                            <span>{ques.definition}</span>
                        </div>
                        <div className='w-full flex-1 mt-10'>
                            <span className='text-sm font-bold'>Chọn đáp án đúng</span>
                            <div className='mt-5'>
                                <Row gutter={[16, 16]}>
                                    {ques.options.map((opt, ansIdx) => (
                                        <Col span={12} key={ansIdx}>
                                            <div className={`w-full h-full p-4 rounded-lg border ${
                                                (ques.id === data[quesIdx]['ques'] && getAllCorrectOption[quesIdx]['idQues']) ?
                                                    (data[quesIdx]['ans'] === getAllCorrectOption[quesIdx]['correctOption']) ?
                                                        (opt.id === getAllCorrectOption[quesIdx]['correctOption'] ? 'bg-green' : '') : (opt.id === data[quesIdx]['ans'] ? 'bg-orange' : (opt.id === getAllCorrectOption[quesIdx]['correctOption'] ? 'bg-blue': '')) : ''
                                            }`} >
                                                <span className='mr-3'>{opt.id}</span>
                                                <span className='text-[#000]'>{opt.text}</span>
                                            </div>
                                        </Col>
                                    ))}

                                </Row>
                            </div>
                        </div>
                    </div>

                )
                )
                // ques.id === data[quesIdx]['ques'] & data[quesIdx]['ques'] === getAllCorrectOption[quesIdx]['idQues'] ? ((data[quesIdx]['ans'] === getAllCorrectOption[quesIdx]['correctOption'] & data[quesIdx]['ans'] === opt.id ) ?  'bg-green' : getAllCorrectOption[quesIdx]['correctOption'] === opt.id ? 'bg-orange': ''): ''
            }

            <div className='mb-10 '>
                <Button className='mr-10' type='primary' size='large' onClick={() => navigate(-1)}>Kiểm tra lại</Button>
                <Button type='default' size='large' onClick={() => navigate('/')}>Trở về trang chủ</Button>
            </div>

        </div>
  )
}

export default ResultTestScreen
