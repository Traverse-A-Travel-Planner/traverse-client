import { Tabs, Typography } from '@arco-design/web-react';

//importing styles
import "./PlaceContent.css"

// importing components
import PlaceMap from './Map/Map';
import ReviewTab from './Reviews/Review';

const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

const PlaceContent = ({state}) => {
  return (
    <div id='bottom-tab-div'>
      <Tabs defaultActiveTab='reviews'>
      <TabPane key='reviews' title='Reviews'>
        <ReviewTab state={state} />
      </TabPane>
      <TabPane key='maps' title='Map'>
        <PlaceMap state={state} />
      </TabPane>
      <TabPane key='itinerary' title='Itinerary'>
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
    </div>
  );
};

export default PlaceContent;
