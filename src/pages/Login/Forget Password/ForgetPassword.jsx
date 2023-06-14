import React, { useState } from "react";
import {
  Modal,
  Button,
  Alert,
  Form,
  Input,
  Message,
} from "@arco-design/web-react";
import appwriteClient from "../../../Services/appwriteClient";
import { Account } from "appwrite";

// importing styles
import "./ForgetPassword.css";

const FormItem = Form.Item;
const account = new Account(appwriteClient);

function ForgetPassword() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [email, setEmail] = useState("");

  const handleForget = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!email) {
        setLoading(false);
        return Message.warning("Email is required!");
      }

      let { host } = window.location;
      let protocol = "https"

      if(host.includes("localhost") || host.includes("127.0.0.1")) {
        protocol = "http"
      }

      let url = `${protocol}://${host}/resetPassword`

      await account.createRecovery(email, url);

      Message.success("Reset password mail sent.")

      setLoading(false);
      setVisible(false);

    } catch (error) {
      setLoading(false);
      Message.error(error.message);
    }
  };

  return (
    <div
      className="forget-password-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        className="forgot-password"
        onClick={() => setVisible(true)}
        style={{
          background: "transparent",
          padding: 0,
          margin: "0px !important",
        }}
      >
        Forgot password?
      </Button>
      <Modal
        wrapClassName="forget-password-modal"
        title="Forget Password"
        visible={visible}
        className="modal-demo-without-content-spacing"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={
          <>
            <Button
              onClick={() => {
                setVisible(false);
                form.clearFields();
              }}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={(e) => handleForget(e)}
              style={{ background: "black", color: "white" }}
            >
              Forget <i className="bi bi-arrow-right-circle ms-1"></i>
            </Button>
          </>
        }
      >
        <Alert
          closable
          type="info"
          content="Check your email for the password reset link"
        />
        <div style={{ padding: 20, paddingBottom: 10 }}>
          <p>
            Reset your password hassle-free with just a single click - receive a
            password reset link directly in your email.
          </p>
        </div>

        <Form
          form={form}
          style={{ display: "flex", width: "100%", padding: "0 0 20px 20px" }}
        >
          <FormItem required field="email" rules={[{ required: true }]}>
            <Input
              width={450}
              type="email"
              value={email}
              onChange={(e) => setEmail(e)}
              height={40}
              style={{ border: "1px solid #dddd" }}
              placeholder="Enter the email"
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default ForgetPassword;
