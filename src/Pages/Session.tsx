import { Formik } from "formik";
import { Form, Input, Typography } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import FlatButton from "../shared/FlatButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from 'yup';
import { auth } from "../App";
import { UseAuthContext } from "../Context/UseAuthContext";

const { Text, Title } = Typography;

type formikType = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number"),
});

export default function Session() {
  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();
  const [error, setError] = useState(false);

  const handleSignIn = async (values: formikType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      dispatch({ type: "getUser", payload: userCredential.user });
      navigate("/simplebankweb");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        handleSignIn(values);
        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <div style={{ position: "relative", textAlign: "right" }}>
              <CloseOutlined
                onClick={() => navigate("/nkelemoil")}
                style={{
                  fontSize: "24px",
                  padding: "10px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            </div>

            <Title level={3} style={{ marginBottom: 0 }}>
              Login or Create Account
            </Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              to checkout and place your order
            </Text>

            <br />

            {error && (
              <Text type="danger">Email or Password mismatch</Text>
            )}

            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label="Email"
                validateStatus={formik.errors.email && formik.touched.email ? "error" : ""}
                help={formik.touched.email && formik.errors.email}
              >
                <Input
                  name="email"
                  placeholder="e.g. myemail@mail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={formik.errors.password && formik.touched.password ? "error" : ""}
                help={formik.touched.password && formik.errors.password}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="custom-password"
                  
                  
                />
              </Form.Item>

              <FlatButton title="Submit" onClick={formik.handleSubmit} />
            </Form>

            <div style={{ marginTop: "20px", fontSize: "14px" }}>
              <Text>
                Don’t have an account?{" "}
                <span
                  style={{
                    color: "#1890ff",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontWeight: 'bold'
                  }}
                  onClick={() => navigate("/nkelemoil/signup")}
                >
                  Click here to create one
                </span>
              </Text>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
