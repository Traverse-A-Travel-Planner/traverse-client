import { Skeleton } from '@arco-design/web-react';
import ImageCarousel from './Carousel/Carousel';

function GeneralDetails({state}) {
  return (
    <div>
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
        <ImageCarousel state={state} />
    </Skeleton>
    </div>
  );
}

export default GeneralDetails;
