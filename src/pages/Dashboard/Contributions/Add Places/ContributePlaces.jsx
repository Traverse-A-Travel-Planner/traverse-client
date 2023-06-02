import React, { useRef, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Message,
  Typography,
  Upload,
} from '@arco-design/web-react';

// importing styles
import "./ContributePlaces.css"

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const KeywordOptions = [
  {
    label: 'Historic',
    value: 'Historic',
  },
  {
    label: 'Religious',
    value: 'Religious',
  },
  {
    label: 'Park',
    value: 'Park',
  },
  {
    label: 'Nature',
    value: 'Nature',
  },
  {
    label: 'Others',
    value: 'Others',
  },
];

const ContributePlaces = ({data}) => {
  const formRef = useRef();
  const [placeDescription, setPlaceDescription] = useState("")

  // Image -> url store
  // Title
  // Coordinates -> [ lat, long ]
  // Location Description -> “Patan Durbar Square”
  // place Description
  // Keyword: [Historic, Religious, Park, Nature] <- 1 only
  // Itinerary - things to do (Chat gpt) [array of strings (in order) ]
  // Author (added by) / Contributor
  // -> (default: admin else /username)
  // Verified status -> [ pending, approved, rejected ]
  // Reviews


  return(
    <div className="add-place-section">
      <Form
      autoComplete='off'
      layout="vertical"
      size='large'
      onSubmit={e => console.log(e)}
    >
      <div className="left item">
        <Form.Item
            label='Place Images'
            field='images'
            triggerPropName='fileList'
            rules={[{ required: true }]}
            initialValue={[
              {
                uid: '-1',
                url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
                name: '20200717',
              },
            ]}
          >
            <Upload
              listType='picture-card'
              imagePreview
              multiple
              name='files'
              action='/'
            />
        </Form.Item>

        <FormItem label='Title' field='title' tooltip={<div>Title is the name of place </div>} rules={[{ required: true }]}>
          <Input style={{ width: 350 }} placeholder='please enter your name' />
        </FormItem>

        <FormItem label='Location' field='location_description' tooltip={<div>Username is required </div>} rules={[{ required: true }]}>
          <Input style={{ width: 350 }} placeholder='please enter your name' />
        </FormItem>

        <FormItem label='Post' field='post' rules={[{ required: true }]}>
            <Select
              style={{width: 350}}
              placeholder='please select'
              options={KeywordOptions}
              allowClear
            />
        </FormItem>

        <FormItem>
            <button
              htmlType='submit'
              className="dashboard-form-submit-btn"
              onClick={async () => {
                if (formRef.current) {
                  try {
                    await formRef.current.validate();
                    Message.info('Form validated');
                  } catch (err) {
                    console.log(formRef.current.getFieldsError());
                    Message.error('All field are required');
                  }
                }
              }}
              type='primary'
              style={{ marginRight: 24 }}
            >
            <i className="bi bi-folder2-open me-1"></i> Save details
            </button>
        </FormItem>
      </div>
      <div className="right item">
        <label> <Typography.Text type='secondary'>Place Description</Typography.Text></label>
        <TextArea
          className="mt-2"
          onChange={e => setPlaceDescription(e)}
          placeholder='Please enter ...'
          defaultValue='This is the contents of the textarea. '
          autoSize
          style={{ width: 350, minHeight: 35 }}
        />
      </div>
      </Form>
    </div>
  )
}

export default ContributePlaces;