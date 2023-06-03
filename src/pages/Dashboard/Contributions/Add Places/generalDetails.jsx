import {
    Form,
    Input,
    Select,
    Upload,
  } from '@arco-design/web-react';

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

const inputStyle = {
    minWidth: '270px',
    width: '100%',
    maxWidth: '400px'}

const GeneralDetails = ({state}) => {
    return(
        <>
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
              <Input style={inputStyle} placeholder='please enter your name' />
            </FormItem>
    
            <FormItem label='Post' field='post' rules={[{ required: true }]}>
                <Select
                  style={inputStyle}
                  placeholder='please select'
                  options={KeywordOptions}
                  allowClear
                />
            </FormItem>
        </div>
        </>
    )
}

export default GeneralDetails;