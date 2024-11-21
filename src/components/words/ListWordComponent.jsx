// import React, { useEffect, useState } from 'react';
// import { Avatar, Divider, List, Skeleton } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from 'antd'
import data from  './../../assets/example_data/fake_data_word.json'
import { PlayCircleOutlined } from '@ant-design/icons'

const ListWordComponent = () => {

//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({});

//   const loadMoreData = () => {
//     if (loading) {
//       return;
//     }
//     setLoading(true);
//     fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
//       .then((res) => res.json())
//       .then((body) => {
//         setData([...data, ...body.results]);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     loadMoreData();
//   }, []);
  return (
    // <div
    //   id="scrollableDiv"
    //   style={{
    //     height: 800,
    //     overflow: 'auto',
    //     padding: '0 16px',
    //     // border: '1px solid rgba(140, 140, 140, 0.35)',
    //   }}
    // >
    //   {/* <InfiniteScroll
    //     dataLength={data.length}
    //     next={loadMoreData}
    //     hasMore={data.length < 50}
    //     loader={
    //       <Skeleton
    //         avatar
    //         paragraph={{
    //           rows: 1,
    //         }}
    //         active
    //       />
    //     }
    //     endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    //     scrollableTarget="scrollableDiv"
    //   > */}
        <List
            size='small'
            bordered

            dataSource={data}
            renderItem={(item) => (
                <List.Item key={item.word}>
                    <div className='w-full h-12  flex items-center justify-between '>
                        <div className='flex flex-col items-center justify-between '>
                            <span className='font-bold text-base'>{item.word}</span>
                            <span className='text-gray'>{item.phonetic}</span>
                        </div>

                        <div>
                            <span>{item.meaning}</span>
                        </div>

                        <div>
                            <PlayCircleOutlined style={{fontSize:'25px', cursor:'pointer'}} />
                        </div>
                    </div>
                </List.Item>
            )}
        />
    //   {/* </InfiniteScroll> */}
    // </div>

    )
}

export default ListWordComponent
