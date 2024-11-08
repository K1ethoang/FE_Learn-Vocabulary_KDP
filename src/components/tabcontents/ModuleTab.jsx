import React from 'react'
import MemoryCard from '../cards/MemoryCard'
import { Select,Divider ,Input} from 'antd'

const ModuleTab = () => {
    const { Search } = Input;
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div>
        <div className='flex justify-between items-center'>
            <Select
                defaultValue="Gần đây"
                style={{ width: 160 }}
                onChange={handleChange}
                options={[
                    { value: 'created', label: 'Đã tạo' },
                    { value: 'current', label: 'Gần đây' },
                    { value: 'studied', label: 'Đã học' },

                ]}
            />
            <Search style={{width:400}} size='large' placeholder="Tìm kiếm thẻ nhớ" onSearch={onSearch} enterButton />

        </div>

        <Divider  style={{borderColor: '#7cb305', fontWeight:'bold'}} orientation="left" plain>TUẦN TRƯỚC</Divider>
       <MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
       <MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
       <MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
       <MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
    </div>
  )
}

export default ModuleTab
