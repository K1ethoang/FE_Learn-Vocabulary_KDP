import { Avatar, Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MemoryCard = ({title, author, numVocabulary}) => {
  const navigate = useNavigate()
  const id = 1234
  const accessCard = () => {
    navigate('/studies/'+ id)
  }
  return (
    <div onClick={accessCard} className='m-3 hover:bg-[#b0c9f4] cursor-pointer rounded-xl shadow-lg'>
      <Card style={{backgroundColor:'#b5cdf36e',boxShadow:'0 25px 50px -12px rgb(0.1 0.1 0.1 / 0.08)'}}  title={title} bordered={false}>
        <div className=' max-w-fit pl-2 pr-2 pt-1 pb-1 rounded-2xl bg-[#edefff]'>
            <div className='text-sm text-slate-400'>{numVocabulary} Thuật ngữ</div>
        </div>
        <div className='mt-4 flex justify-start items-center'>
            <Avatar style={{marginRight:"6px"}}>A</Avatar>
            {author}
        </div>
      </Card>

    </div>
  )
}

export default MemoryCard
