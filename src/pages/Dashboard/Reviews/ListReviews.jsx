import { Avatar, Typography, Rate, Image } from '@arco-design/web-react';
import { Select, Message } from '@arco-design/web-react';

// importing styles
import "./ListReviews.css"

import Header from "../../../components/Header/Header"
import Sidebar from "../../../components/Sidebar/Sidebar";

const Option = Select.Option;
const options = ['Recent', 'Ratings', 'Oldest'];

const url = "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"

const ListReviews = ({data}) => {
    const handleFilterClick = (value) => {
        Message.info({
            content: `You select ${value}.`,
            showIcon: true,
        })
    }

    return(
    <div className="main-body">
      <Header />
      <div className="dashboard-content reviews">
        <Sidebar data={data} />
        <div class="content">
            <div class="url-path"> Dashboard / Reviews</div>
            <div className="reviews-wrapper">
                <div className="review-list">
                    <div className="header-block">
                        <div className='content-header'>
                            <Typography.Title heading={5} className="ms-4 label-header">Reviews</Typography.Title>
                        </div>
                        <div className="filter-buttons">
                            <Select
                                placeholder='Filter Reviews'
                                style={{ width: 154 }}
                                onChange={handleFilterClick}
                            >
                                {options.map((option, index) => (
                                <Option key={option} disabled={index === 3} value={option}>
                                    {option}
                                </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {
                        [1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                            <div className="review" key={index}>
                                <div className="left">
                                    <div className="avatar">
                                        <Avatar>
                                            A
                                        </Avatar>
                                    </div>
                                </div>
                                <div className="row-right">
                                    <div className="right">
                                        <div className="user-details">
                                            <Typography.Text bold>
                                                Bibek Shah
                                            </Typography.Text>
                                        </div>
                                        <div className="rating">
                                            <Rate readonly defaultValue={3.5} />
                                            <Typography.Text type='secondary'>
                                                {new Date().toLocaleDateString()}
                                            </Typography.Text>
                                        </div>
                                        <div className="description mt-2">
                                            <div className="text">
                                                <Typography.Text >
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veritatis iure molestiae animi sed placeat nam error. consectetur adipisicing elit.
                                                </Typography.Text>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image">
                                        <Image width={70} src={url} alt='Patan' />
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="review-details">

                </div>
            </div>
        </div>
      </div>
    </div>
    )
}

export default ListReviews;