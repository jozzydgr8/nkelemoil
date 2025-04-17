import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography, Input, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../App";
import { UseAuthContext } from "../Context/UseAuthContext";
import FlatButton from "../shared/FlatButton";

const { Title, Text, Link } = Typography;

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Must be more than three characters long"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number"),
});

export default function SignUp() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();

  const handleSignUp = async ({ name, email, password }: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      await updateProfile(user, { displayName: name });
      dispatch({ type: "getUser", payload: user });
      navigate("/nkelemoil");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
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
          }}
        >
          <div style={{ maxWidth: "500px", width: "100%", position: "relative" }}>
            <CloseOutlined
              onClick={() => navigate("/nkelemoil")}
              style={{
                fontSize: "24px",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "5px",
                position: "absolute",
                right: 0,
              }}
            />

            <Title level={4} style={{  marginBottom: "20px" }}>
              Create an account to place your order
            </Title>

            {error && (
              <Text type="danger" style={{ display: "block", marginBottom: "10px" }}>
                Error: Account may already exist
              </Text>
            )}

            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label="Full Name"
                validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
                help={formik.touched.name && formik.errors.name}
              >
                <Input
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="large"
                />
              </Form.Item>

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
                  size="large"
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
                  size="large"
                  style={{
                    padding: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                    fontSize: "16px",
                  }}
                />
              </Form.Item>

              <FlatButton title="Submit" onClick={formik.handleSubmit} />
            </Form>

            <Text style={{ marginTop: "20px", display: "block", textAlign: "center" }}>
              Already have an account?{" "}
              <Link onClick={() => navigate("/simplebankweb/user")}>Sign in here</Link>
            </Text>
          </div>
        </div>
      )}
    </Formik>
  );
}
