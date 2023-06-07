import {
    Form,
    Input,
    Message
} from '@arco-design/web-react';
import { useState } from 'react';

const FormItem = Form.Item;
const TextArea = Input.TextArea;


const inputStyle = {
    minWidth: '270px',
    width: '100%',
    maxWidth: '400px'
    // height: '40px'
}

const LocationDescription = ({state}) => {
    const [placeDescription, setPlaceDescription] = useState("")

    return(
        <>
        <div className="right item">
            <FormItem label='Location' field='location_description' tooltip={<div>Username is required </div>} rules={[{ required: true }]}>
                <Input style={inputStyle} value='' placeholder='please enter your name' />
            </FormItem>
            <TextArea
                className="mt-2"
                onChange={e => setPlaceDescription(e)}
                placeholder='Please enter location description'
                defaultValue='This is the contents of the textarea. '
                value={placeDescription}
                autoSize
                style={{ ...inputStyle, minHeight: 35 }}
            />
    
            <FormItem>
                <button
                  htmlType='submit'
                  className="dashboard-form-submit-btn mt-4"
                  onClick={async () => {
                    if (state.formRef.current) {
                      try {
                        await state.formRef.current.validate();
                        Message.info('Form validated');
                      } catch (err) {
                        console.log(state.formRef.current.getFieldsError());
                        Message.error('All field are required');
                      }
                    } else {
                        Message.error('All field are required');
                    }
                  }}
                  type='primary'
                  style={{ marginRight: 24 }}
                >
                <i className="bi bi-folder2-open me-1"></i> Save details
                </button>
            </FormItem>
        </div>
        </>
    )
}

export default LocationDescription;