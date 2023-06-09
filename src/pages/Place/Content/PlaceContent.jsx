import { Tabs, Typography } from '@arco-design/web-react';
import ReviewTab from './Reviews/Review';
const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

const PlaceContent = ({state}) => {
  return (
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
  );
};

export default PlaceContent;
