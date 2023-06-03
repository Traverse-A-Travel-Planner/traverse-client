import { Avatar, Typography, Image } from '@arco-design/web-react';
import { Select, Message } from '@arco-design/web-react';
import { Link } from "react-router-dom";

// importing styles
import "./PlacesList.css"

const Option = Select.Option;
const options = ['Recent', 'Ratings', 'Oldest'];

const url = "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"

const ListPlaces = ({data}) => {
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
        <div className="contributed-places-list">
            <div className="header-block">
                <div className='content-header'>
                    <Typography.Title heading={5} className="ms-4 label-header">Contributions</Typography.Title>
                </div>
                <div className="filter-buttons">
                    <Select
                        placeholder='Filter places'
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
                    <div className="contributed-place" key={index}>
                        <div className="left">
                            <div className="avatar">
                                <Avatar>
                                    {getInitials("Bibek Shah")}
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

                                <Typography.Text type='secondary'>
                                    {new Date().toLocaleDateString()}
                                </Typography.Text>

                                <div className="description mt-2">
                                    <Typography.Text>
                                        <span className='text-muted'>Location: </span>
                                        Patan, Lalitpur
                                    </Typography.Text>
                                    <div className="text">
                                        <Typography.Text >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Autem veritatis iure molestiae animi sed placeat nam error.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magnam, odio recusandae esse illum accusamus neque repellat doloribus 
                                            vel modi consequuntur id doloremque nam quisquam optio ratione harum, quam rem?
                                        </Typography.Text>
                                    </div>
                                </div>

                                <button className="btn btn-dark shadow-sm view-contributed-place-btn">
                                    <Link style={{ textDecoration: "none", color: "white" }} to="/dashboard">
                                        View Details
                                    </Link>
                                </button>
                            </div>
                            <div className="image">
                                <Image width={150} src={url} alt='Patan' />
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default ListPlaces;