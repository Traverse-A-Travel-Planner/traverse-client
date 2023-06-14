import { Button, Form, Input } from "@arco-design/web-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const inputStyle = {
  minWidth: "270px",
  width: "100%",
};

const PlaceDescription = ({ state }) => {
  console.log(state.loadingSave);

  return (
    <>
      <div className="right item">
        <TextArea
          className="mt-2"
          onChange={(e) => state.setPlaceDescription(e)}
          placeholder="Enter description for the chosen location"
          defaultValue="This is the contents of the textarea. "
          value={state.place_description}
          autoSize
          style={{ ...inputStyle, minHeight: 250 }}
        />

        <FormItem>
          <Button
            className="dashboard-form-submit-btn mt-4"
            loading={state.loadingSave}
            onClick={async () => {
              state.handleAddPlace();
            }}
            type="primary"
            style={{ marginRight: 24 }}
          >
            <i className="bi bi-folder2-open me-1"></i> Add Place
          </Button>
        </FormItem>
      </div>
    </>
  );
};

export default PlaceDescription;
