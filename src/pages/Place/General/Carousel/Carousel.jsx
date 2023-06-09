import { Carousel, Image } from '@arco-design/web-react';

function ImgComponent(props) {
  const { src, style, className } = props;
  return (
    <div 
    style={{ ...style, borderRadius: '10px' }}
    className={className}>
      <Image
        src={src}
        width={430}
        height={300}
        style={{borderRadius: '10px'}}
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
    style={{ width: 430 }}>
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
