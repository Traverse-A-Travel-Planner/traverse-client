// importing styles
import "./GeneralDetails.css"

// arco-design components
import { Skeleton, Typography } from '@arco-design/web-react';
import Paragraph from '@arco-design/web-react/es/Typography/paragraph';
import Title from '@arco-design/web-react/es/Typography/title';

// importing custom components
import ImageCarousel from './Carousel/Carousel';
import GeneralDescription from './Description/GeneralDescription';

function GeneralDetails({state}) {
  return (
    <>
    <Skeleton
        loading={state.loading}
        text={{
            rows: 6, 
            width: '100%',
            style: {
                minWidth: 400,
                width: '100%',
                height: '300px', 
            } 
        }}
        image={{ 
            shape: "square", 
            style: {
                minWidth: '400px',
                width: '100%',
                height: 300,
                background: "linear-gradient(90deg, var(--color-fill-3) 25%, var(--color-fill-1) 37%, var(--color-fill-3) 63%)",
            } 
        }}
        animation
    >
        <div className="image-section">
            <ImageCarousel state={state} />
        </div>
        <div className="data-section">
            <GeneralDescription state={state} />
        </div>
        <div className="description-block mt-4">
            <Typography>
                <Title 
                heading={5} 
                style={{marginTop: '0px'}}
                >
                    About {state.placeData.title}
                </Title>
                <Paragraph type='secondary' className="place-description-paragraph">
                    {state.placeData.place_description}
                </Paragraph>
            </Typography>
        </div>
    </Skeleton>
    </>
  );
}

export default GeneralDetails;
