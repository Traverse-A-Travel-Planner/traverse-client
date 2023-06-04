import { Progress, Typography } from "@arco-design/web-react";

// importing styles
import "./RatingInsights.css"

const RatingInsights = () => {
    return(
        <div className="reviews-overview-card">
            {
                [30, 20, 25, 15, 10].map((value, index) => {
                    return(
                        <div className='reviewed-bar'>
                            <Typography.Text type='warning' bold className="rating-value">{5 - index} stars</Typography.Text>
                            <Progress 
                                className="rating-count"
                                size='large'
                                color='#ffc107'
                                percent={value} 
                                width='100%' />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RatingInsights;