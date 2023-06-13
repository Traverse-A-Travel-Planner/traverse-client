// import styles
import "./Carousel.css"

// aarco-design components
import { Carousel, Image } from '@arco-design/web-react';

function ImgComponent(props) {
  const { src, style, className } = props;
  return (
    <div 
    style={{ ...style, borderRadius: '10px' }}
    className={className}>
      <Image
        src={src ? src : "some-error.png"}
        width={"100%"}
        height={300}
        style={{borderRadius: '10px', minWidth: 430}}
        alt='img'
      />
    </div>
  );
}

function ImageCarousel({state}) {
  return (
    <Carousel 
    autoPlay={true}
    indicatorType="dot"
    showArrow='hover'
    style={{ width: '100%', borderRadius: '10px' }}>
        {
            (
                state.placeData.image && 
                state.placeData.image.map((src, index) => (
                    <ImgComponent key={index} src={src} />  
                ))
            )
        }
    </Carousel>
  );
}

export default ImageCarousel;
