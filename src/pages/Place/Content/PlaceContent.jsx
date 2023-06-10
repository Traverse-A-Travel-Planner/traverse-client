import { Tabs, Typography } from '@arco-design/web-react';
import ReviewTab from './Reviews/Review';

//importing styles
import "./PlaceContent.css"

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
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </TabPane>
      <TabPane key='itinerary' title='Itinerary'>
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
    </div>
  );
};

export default PlaceContent;