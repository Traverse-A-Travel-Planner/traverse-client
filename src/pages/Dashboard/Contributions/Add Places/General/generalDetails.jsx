import { Form, Image, Input, Select, Upload } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";

// importing styles
import "./generalDetails.css";

const FormItem = Form.Item;
const KeywordOptions = [
  {
    label: "Historic",
    value: "historic",
  },
  {
    label: "Religious",
    value: "religious",
  },
  {
    label: "Park",
    value: "park",
  },
  {
    label: "Nature",
    value: "nature",
  },
  {
    label: "Others",
    value: "others",
  },
];

const inputStyle = {
  minWidth: "250px",
  width: "100%",
  maxWidth: "400px",
};

const GeneralDetails = ({ state }) => {

  const renderUploadList = (filesList, props) => (
    <div style={{ display: "flex", gap: "1em 1em" }}>
      {filesList.map((file) => {
        const url = file.url || URL.createObjectURL(file.originFile);
        return (
          <Image
            width={80}
            height={80}
            src={url}
            alt="img"
            actions={[
              <button
                key="1"
                className="image-demo-action-item"
                style={{
                  background: "transparent",
                  color: "white",
                  outline: "none",
                  border: "none",
                  fontSize: "18px",
                }}
                onClick={() => {
                  props.onRemove(file);
                }}
              >
                <IconDelete />
              </button>,
            ]}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <div className="left item">
        <Form.Item
          style={{ width: "auto" }}
          label="Place Images"
          field="images"
          triggerPropName="fileList"
          rules={[{ required: true }]}
        >
          <Upload
            onChange={(e) => state.setImageFiles(e)}
            listType="picture-card"
            multiple
            name="files"
            renderUploadList={renderUploadList}
            action="/"
          />
        </Form.Item>

        <FormItem
          label="Title"
          field="title"
          tooltip={<div>Title is the name of place </div>}
          rules={[{ required: true }]}
        >
          <Input
            onChange={(e) => state.setTitle(e)}
            style={inputStyle}
            placeholder="please enter your name"
          />
        </FormItem>

        <FormItem label="Post" field="post" rules={[{ required: true }]}>
          <Select
            onChange={(e) => state.setKeyWord(e)}
            style={inputStyle}
            placeholder="please select"
            options={KeywordOptions}
            allowClear
          />
        </FormItem>
      </div>
    </>
  );
};

export default GeneralDetails;
