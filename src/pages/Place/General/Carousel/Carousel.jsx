import { Carousel, Image } from '@arco-design/web-react';

function ImgComponent(props) {
  const { src, style, className } = props;
  return (
    <div style={style} className={className}>
      <Image
        src={src}
        width={430}
        height={300}
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
