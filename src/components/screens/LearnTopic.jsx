import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Flex, Progress } from 'antd';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const LearnTopic = () => {
            const questions = [
                {
                    id: 1,
                    definition: "thuộc học viện, ĐH, viện hàn lâm",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: true },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 2,
                    definition: "tình cờ, ngẫu nhiên",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: true },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 3,
                    definition: "tiến bộ, nâng cao",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: true },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 4,
                    definition: "bổ sung, thêm vào",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: true }
                    ]
                },
                {
                    id: 5,
                    definition: "liên quan đến học thuật",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: true },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 6,
                    definition: "tình cờ, ngẫu nhiên",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: true },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 7,
                    definition: "tiến bộ, nâng cao",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: true },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 8,
                    definition: "bổ sung, thêm vào",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: true }
                    ]
                },
                {
                    id: 9,
                    definition: "liên quan đến học thuật",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: true },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: false },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                },
                {
                    id: 10,
                    definition: "tình cờ, ngẫu nhiên",
                    options: [
                        { id: 1, text: "academic (adj), /ˌækəˈdemik/", isCorrect: false },
                        { id: 2, text: "accidental adj. /ˌæksiˈdentl/", isCorrect: true },
                        { id: 3, text: "advanced adj. /ədˈvɑːnst/", isCorrect: false },
                        { id: 4, text: "additional adj. /əˈdɪʃənl/", isCorrect: false }
                    ]
                }
            ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedOption, setSelectedOption] = useState(null)
    const [stillQuestion, setStillQuestion]  = useState(true)
    const [percent, setPercent] = useState(0)
    const [percentExactly, setPercentExactly] = useState(0)
    const [resultTrue, setResultTrue] = useState(0)
    const totalQuestion = questions.length
    const navigate = useNavigate()
    const currentQuestion = questions[currentQuestionIndex];
    const location = useLocation();

    const refreshPage = () => {
        window.location.href = location.pathname;
    };



    const handleAnswerClick = (option) => {
        setSelectedOption(option);
        if(option.isCorrect){
            setResultTrue(resultTrue+1)
        }
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setPercent((currentQuestionIndex+1) / totalQuestion * 100)
                setPercentExactly((resultTrue) / totalQuestion * 100)

                setSelectedOption(null);
            } else {
                setStillQuestion(false)
            }
        }, 1500);
    };



    return (
        <div className='w-full min-h-screen flex flex-col items-center bg-[#F0F8FF]'>
            <div className='w-full h-20 bg-[#007BFF] text-bg-light flex items-center justify-between p-6 font-bold text-xl mb-10'>
                <div>Hoc</div>
                <div>Title of topic</div>
                <div className=' w-7 h-7 text-center  border hover:bg-[rgb(82,154,255)] cursor-pointer ' onClick={()=> navigate(-1)}>X</div>
            </div>

            {stillQuestion?
            <>
                <div className='flex w-3/5 h-9 mb-4 text-xl items-center justify-around'>
                    <div className='mr-2'>{currentQuestionIndex}</div>
                    <Progress
                        className='w-4/5'

                        percent={percent}
                        showInfo={false}
                    />
                    <div className='ml-2'>{questions.length}</div>
                </div>

                <div className='w-full flex-grow flex justify-center items-center  '>
                    <div className='w-3/5 h-3/5 bg-[#fff] rounded-lg shadow-lg p-6 '>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Định nghĩa</h2>
                            <p className="text-lg">{currentQuestion.definition}</p>
                        </div>
                        <div>
                        <h3 className="text-lg font-semibold mb-4">Chọn thuật ngữ đúng</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options.map(option => (
                                    <button
                                        key={option.id}
                                        className={`flex items-center justify-between w-full p-4 border rounded-lg  ${selectedOption ? (option.isCorrect ? 'bg-green' : (selectedOption.id === option.id ? 'bg-orange' : 'hover:bg-[rgb(232,237,251)]')) : 'hover:bg-[rgb(232,237,251)]'} `}
                                        onClick={() => handleAnswerClick(option)}
                                        disabled={!!selectedOption}
                                    >
                                        <span>{option.id}</span>
                                        <span>{option.text}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>:
            <>
                <div className=' w-full flex-grow flex flex-col justify-center items-center'>
                    <div className='text-2xl font-bold mb-8'>Kết quả:</div>

                    <div className='mb-6 '>
                        <span className='mr-5'> Phần trăm số câu đúng: </span>
                        <Progress strokeColor={'green'} type="circle" percent={percentExactly} />
                    </div>

                    <div>
                        <span className='mr-9'> Phần trăm số câu sai: </span>
                        <Progress type="circle" percent={100-percentExactly} strokeColor={'red'} />
                    </div>
                </div>

                <div className='w-80 h-10 flex items-center justify-between mb-8 mt-4  '>
                    <Button icon={<ReloadOutlined />} size='large' type="primary" onClick={refreshPage}>Học lại</Button>
                    <Button icon={<ArrowLeftOutlined />} size='large' onClick={() => navigate(-1)}>Trở về</Button>
                </div>

            </>}

        </div>
  )
}

export default LearnTopic
