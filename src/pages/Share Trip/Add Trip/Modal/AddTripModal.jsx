import React, { useState } from 'react';
import { Modal, Button, Message, Form, Input, Select } from '@arco-design/web-react';

const FormItem = Form.Item;

function AddTripModal() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  async function validateForm() {
    const validated = await form.validate()
    console.log(validated)
    if (!validated) {
        Message.error("All the fields are required")
        return
    }

    setLoading(true);
    setTimeout(() => {
        Message.success('Success !');
        setVisible(false);
        setLoading(false);
    }, 1500);
  }
  
  return (
    <div>
      <Button onClick={() => setVisible(true)} type='primary'>
        Open Draggable Modal
      </Button>
      <Modal
        title='Share Trip'
        visible={visible}
        onOk={validateForm}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        footer={
            <>
              <Button
                onClick={() => {
                  setVisible(false);
                }}
              >
                Return
              </Button>
              <Button
                loading={loading}
                onClick={validateForm}
                type='primary'
              >
                Submit
              </Button>
            </>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{
            style: { flexBasis: 90 },
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' },
          }}
        >
          <FormItem label='Name' field='name' rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
          <FormItem label='Gender' required field='sex' rules={[{ required: true }]}>
            <Select options={['1', '2']} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default AddTripModal;
