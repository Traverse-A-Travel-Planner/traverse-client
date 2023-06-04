import { Button } from '@arco-design/web-react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';

import GeneralDetails from './generalDetails';
import LocationDetails from './locationDetails';

const RenderContent = ({state}) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
        }}
      >
        {
            state.current === 1 ? 
            (<GeneralDetails state={state} />)
            : (<LocationDetails state={state} />)
        }

        <div style={{textAlign: 'left'}}>
          <Button
            type='secondary'
            disabled={state.current <= 1}
            onClick={() => state.setCurrent(state.current - 1)}
            style={{ paddingLeft: 8 }}
          >
            <IconLeft />
            Back
          </Button>
          <Button
            disabled={state.current >= 3}
            onClick={() => state.setCurrent(state.current + 1)}
            style={{ marginLeft: 20, paddingRight: 8 }}
            type='primary'
          >
            Next
            <IconRight />
          </Button>
        </div>
      </div>
    );
}

export default RenderContent;