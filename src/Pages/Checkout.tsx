import { Formik } from "formik";
import * as Yup from "yup";
import FlatButton from "../shared/FlatButton";
import { checkoutvalues } from "../shared/Types";
import { getNames } from "country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Input, Select } from "antd";
import { UseContextData } from "../Context/UseContextData";
import { UseAuthContext } from "../Context/UseAuthContext";

type checkprops = {
  handleCheckOut: (values: checkoutvalues) => void;
  checkoutdetails: checkoutvalues;
};

const countries = getNames();

const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required").min(3, "Minimum of three characters required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  deliveryNote: Yup.string(), // Optional
});

export default function Checkout({ handleCheckOut, checkoutdetails }: checkprops) {
  const {user} = UseAuthContext();
console.log(user?.email)
  return (
    <section>
      <div>
        <Formik
          initialValues={
            checkoutdetails || {
              name: "",
              email: "",
              phone: "",
              country: "",
              address: "",
              city: "",
              state: "",
              deliveryNote: "",
            }
          }
          validationSchema={checkoutSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleCheckOut(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form
              layout="vertical"
              onFinish={() => {
                formik.setTouched({
                  name: true,
                  email: true,
                  phone: true,
                  country: true,
                  address: true,
                  city: true,
                  state: true,
                  deliveryNote: true,
                });
                formik.handleSubmit();
              }}
            >
              <h3>Information</h3>

              <Form.Item
                label="Full Name"
                validateStatus={formik.touched.name && formik.errors.name ? "error" : ""}
                help={formik.touched.name && formik.errors.name}
              >
                <Input
                  name="name"
                  placeholder="Full name e.g: John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                validateStatus={formik.touched.email && formik.errors.email ? "error" : ""}
                help={formik.touched.email && formik.errors.email}
              >
                <Input
                  name="email"
                  placeholder="Email e.g: myname@email.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                validateStatus={formik.touched.phone && formik.errors.phone ? "error" : ""}
                help={formik.touched.phone && formik.errors.phone}
              >
                <PhoneInput
                  country={"ng"}
                  onlyCountries={["ng", "gh", "us", "gb"]}
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  onBlur={() => formik.setFieldTouched("phone", true)}
                  inputStyle={{ width: "100%" }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                />
              </Form.Item>

              <h3>Delivery</h3>

              <Form.Item
                label="Country"
                validateStatus={formik.touched.country && formik.errors.country ? "error" : ""}
                help={formik.touched.country && formik.errors.country}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select your country"
                  value={formik.values.country}
                  onChange={(value) => formik.setFieldValue("country", value)}
                  onBlur={() => formik.setFieldTouched("country", true)}
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {countries.map((country) => (
                    <Select.Option key={country} value={country}>
                      {country}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Street / Address"
                validateStatus={formik.touched.address && formik.errors.address ? "error" : ""}
                help={formik.touched.address && formik.errors.address}
              >
                <Input
                  name="address"
                  placeholder="Street/Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="City / Town"
                validateStatus={formik.touched.city && formik.errors.city ? "error" : ""}
                help={formik.touched.city && formik.errors.city}
              >
                <Input
                  name="city"
                  placeholder="City / Town"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="State"
                validateStatus={formik.touched.state && formik.errors.state ? "error" : ""}
                help={formik.touched.state && formik.errors.state}
              >
                <Input
                  name="state"
                  placeholder="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item label="Delivery Note (Optional)">
                <Input.TextArea
                  name="deliveryNote"
                  placeholder="Delivery description (optional)"
                  value={formik.values.deliveryNote}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item>
                <FlatButton title="Submit" onClick={() => formik.handleSubmit()} />
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
