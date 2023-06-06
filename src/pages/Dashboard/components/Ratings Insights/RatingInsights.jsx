import { Progress, Typography } from "@arco-design/web-react";

// importing styles
import "./RatingInsights.css";

const RatingInsights = ({ insights }) => {
  return (
    <div className="reviews-overview-card">
      {[1, 1, 1, 1, 1].map((item, index) => {
        return (
          <div className="reviewed-bar" key={index}>
            <Typography.Text type="warning" bold className="rating-value">
              {5 - index} stars
            </Typography.Text>
            <Progress
              className="rating-count"
              size="large"
              color="#ffc107"
              percent={Object.values(insights)[5 - index]}
              width="100%"
            />
          </div>
        );
      })}
    </div>
  );
};

export default RatingInsights;
