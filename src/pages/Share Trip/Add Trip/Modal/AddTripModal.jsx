import React, { useState } from "react";
import {
  Modal,
  Button,
  Message,
  Form,
  Input,
  DatePicker,
} from "@arco-design/web-react";
import dayjs from "dayjs";

import appwriteClient from "../../../../Services/appwriteClient";
import { Databases, ID } from "appwrite";
import { databaseId } from "../../../../Services/config";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const AddTripModal = () => {
  const db = new Databases(appwriteClient);

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
    try {
      const res = await form.validate();
      setLoading(true);

      let payload = { ...res, author_id: localStorage.getItem("userId") };

      await db.createDocument(databaseId, "sharedTrips", ID.unique(), payload);

      setLoading(false);
      setVisible(false);
      form.clearFields();

      let newTripAdded = new CustomEvent("newTripAdded", {});
      document.dispatchEvent(newTripAdded);
    } catch (error) {
      setLoading(false);
      // Handle the error here
      Message.error("All the fields are required");
    }
  }

  return (
    <>
      <Input
        onClick={() => setVisible(true)}
        style={{ width: 385, height: 35, background: "#e7e8ea" }}
        allowClear
        placeholder="Share trips with others"
      />
      <Modal
        title="Share Trip"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.clearFields();
        }}
        autoFocus={false}
        footer={
          <>
            <Button
              onClick={() => {
                setVisible(false);
                form.clearFields();
              }}
            >
              Return
            </Button>
            <Button
              loading={loading}
              onClick={() => validateForm()}
              style={{ background: "black", color: "white" }}
            >
              <i className="bi bi-plus-circle me-1"></i> Submit
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
            style: { flexBasis: "calc(100% - 90px)" },
          }}
        >
          <FormItem
            label="Location"
            required
            field="location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name of location. Eg: Goa Beach" />
          </FormItem>

          <FormItem
            label="Date"
            required
            field="departure_date"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: 390 }}
              placeholder="An estimate date for your departure"
              shortcutsPlacementLeft
              shortcuts={[
                {
                  text: "Today",
                  value: () => dayjs(),
                },
                {
                  text: "A week later",
                  value: () => dayjs().add(1, "week"),
                },
                {
                  text: "A month later",
                  value: () => dayjs().add(1, "month"),
                },
                {
                  text: "2 months later",
                  value: () => dayjs().add(2, "month"),
                },
              ]}
            />
          </FormItem>

          <FormItem
            label="Message"
            required
            field="message"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="What do you want others to know about this trip?"
              autoSize={{ minRows: 2, maxRows: 6 }}
              style={{ width: 390 }}
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default AddTripModal;
