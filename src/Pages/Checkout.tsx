import { Formik } from "formik";
import * as Yup from "yup"; // 👈 Import Yup
import FlatButton from "../shared/FlatButton";
import { checkoutvalues } from "../shared/Types";
import { getNames } from "country-list";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Form, Input, Select } from "antd";
type checkprops = {
  handleCheckOut: (values: checkoutvalues) => void;
  checkoutdetails: checkoutvalues
};

const styles = {
  inputContainer: {
    margin: "16px 0",
  },
};

// ✅ Validation schema
const checkoutSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required").min(3,'minimum of three characters required'),
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
  const countries = getNames();

  return (
    <section >
      <div >
        <Formik
          initialValues={ checkoutdetails || {
            name: "",
            email: "",
            phone: "",
            country: "",
            address: "",
            city: "",
            state: "",
            deliveryNote: "",
          }}
          validationSchema={checkoutSchema}
          onSubmit={(values, {setSubmitting}) => {
            handleCheckOut(values);
            setSubmitting(false);
          }}
        >
          {(props) => (
            
            
            <Form layout="vertical" onFinish={props.handleSubmit}>
              <h3>Information</h3>
            
              <Form.Item
                label="Full Name"
                validateStatus={props.touched.name && props.errors.name ? "error" : ""}
                help={props.touched.name && props.errors.name ? props.errors.name : " "}
              >
                <Input
                  name="name"
                  placeholder="Full name e.g: John Doe"
                  value={props.values.name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Item>
            
              <Form.Item
                label="Email"
                validateStatus={props.touched.email && props.errors.email ? "error" : ""}
                help={props.touched.email && props.errors.email ? props.errors.email : " "}
              >
                <Input
                  name="email"
                  placeholder="Email e.g: myname@email.com"
                  value={props.values.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Item>
            
              <Form.Item
                label="Phone"
                validateStatus={props.touched.phone && props.errors.phone ? "error" : ""}
                help={props.touched.phone && props.errors.phone ? props.errors.phone : " "}
              >
                <PhoneInput
                  country={"ng"}
                  onlyCountries={["ng", "gh", "us", "gb"]}
                  value={props.values.phone}
                  onChange={(value) => props.setFieldValue("phone", value)}
                  onBlur={() => props.setFieldTouched("phone", true)}
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
                validateStatus={
                  props.touched.country && props.errors.country ? "error" : ""
                }
                help={props.touched.country && props.errors.country ? props.errors.country : " "}
              >
                <Select
                  showSearch
                  style={{ width: "100%", maxWidth: "300px" }}
                  placeholder="Select your country"
                  optionFilterProp="children"
                  getPopupContainer={(trigger) => trigger.parentElement}
                  dropdownMatchSelectWidth={false}
                  value={props.values.country}
                  onChange={(value) => props.setFieldValue("country", value)}
                  onBlur={() => props.setFieldTouched("country", true)}
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
                validateStatus={props.touched.address && props.errors.address ? "error" : ""}
                help={props.touched.address && props.errors.address ? props.errors.address : " "}
              >
                <Input
                  name="address"
                  placeholder="Street/Address"
                  value={props.values.address}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Item>
            
              <Form.Item
                label="City / Town"
                validateStatus={props.touched.city && props.errors.city ? "error" : ""}
                help={props.touched.city && props.errors.city ? props.errors.city : " "}
              >
                <Input
                  name="city"
                  placeholder="City / Town"
                  value={props.values.city}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Item>
            
              <Form.Item
                label="State"
                validateStatus={props.touched.state && props.errors.state ? "error" : ""}
                help={props.touched.state && props.errors.state ? props.errors.state : " "}
              >
                <Input
                  name="state"
                  placeholder="State"
                  value={props.values.state}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Item>
            
              <Form.Item label="Delivery Note (Optional)">
                <Input.TextArea
                  name="deliveryNote"
                  placeholder="Delivery description (optional)"
                  value={props.values.deliveryNote}
                  onChange={props.handleChange}
                />
              </Form.Item>
            
              <Form.Item>
                <FlatButton title="Submit" onClick={() => props.handleSubmit()} />
              </Form.Item>
            </Form>
            
          )}
        </Formik>
      </div>
    </section>
  );
}
