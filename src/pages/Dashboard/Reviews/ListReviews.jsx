import { Avatar, Typography, Rate, Image, Button } from '@arco-design/web-react';
import { Select, Message } from '@arco-design/web-react';

// importing styles
import "./ListReviews.css"
import "../css/dashboardGeneric.css";

import Header from "../../../components/Header/Header"
import Sidebar from "../../../components/Sidebar/Sidebar";
import RatingInsights from '../components/Ratings Insights/RatingInsights';

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

    const getInitials = (name) => {
        const words = name.split(' ');
        const initials = words.map(word => word.charAt(0));
        return initials.join('');
    }

    return(
    <div className="main-body">
      <Header />
      <div className="dashboard-content reviews">
        <Sidebar data={data} />
        <div class="content">
            <div class="url-path">Dashboard / Reviews</div>
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
                                            {getInitials("Bibek Shah")}
                                        </Avatar>
                                    </div>
                                </div>
                                <div className="row-right">
                                    <div className="right">
                                        <Typography.Title heading={6} className="my-0 ">Patan Durbar Square</Typography.Title>
                                        <Typography.Text type='secondary'>Lalitpur, Nepal</Typography.Text>
            
                                        <div className="rating mt-2">
                                            <Rate readonly defaultValue={4} />
                                            <Typography.Text type='success'>
                                                {4} star review
                                            </Typography.Text>
                                            <Typography.Text type='secondary' className="">
                                                Reviewed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                                            </Typography.Text>
                                        </div>
                                        <div className="description mt-3">
                                            <div className="text">
                                                <Typography.Text >
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veritatis iure molestiae animi sed placeat nam error. consectetur adipisicing elit.
                                                </Typography.Text>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image">
                                        <Image width={120} src={url} alt='Patan' />
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="review-details">
                    <div className="header-block">
                        <div className='content-header'>
                            <Typography.Title heading={5} className="my-0 mb-1">Insights</Typography.Title>
                            <Typography.Text type='secondary'>General overview of reviews published</Typography.Text>
                        </div>
                    </div>
                    <div className="insights-details">
                        <Typography.Title heading={6} className="my-0">
                            {50} reviews published
                        </Typography.Title>
                        <RatingInsights />
                    </div>
                    <div className="bottom-block">
                        <Typography.Title heading={6} className="mt-4 mb-1">
                            Write more reviews?
                        </Typography.Title>
                        <Typography.Text type='secondary'>
                            Explore featured collections on Traverse
                        </Typography.Text>

                        <Button
                        className="mt-3"
                        type='outline' 
                        style={{width: 'max-content', color: 'black', border: '1px solid black'}}>
                            View featured
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
}

export default ListReviews;