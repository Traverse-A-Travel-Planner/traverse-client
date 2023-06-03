import React, { useRef, useState } from 'react';
import {
  Form,
  Steps
} from '@arco-design/web-react';

// importing styles
import "./ContributePlaces.css"
import RenderContent from './renderSteps';

const Step = Steps.Step;

const ContributePlaces = ({data}) => {
  const formRef = useRef();
  const [current, setCurrent] = useState(1);

  return(
      
    <div className="add-place-section">
    <div style={{
        width: '100%', 
        height: '100%',
    }}>
      <Form
      autoComplete='off'
      layout="vertical"
      size='large'
      onSubmit={e => console.log(e)}
      >
      <Steps current={current} direction='vertical' style={{minWidth: 250, height: '100%'}}>
        <Step title='General' description="Add general details and images" />
        <Step title='Location' description="Add location details" />
        <Step title='Description' description="Add description" />
      </Steps>
      {<RenderContent state={{current, setCurrent, formRef}} />}
      </Form>
    </div>
    </div>
  )
}

export default ContributePlaces;