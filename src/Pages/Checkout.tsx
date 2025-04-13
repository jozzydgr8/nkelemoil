import { Input, Select } from "antd";
import { Formik } from "formik";
import * as Yup from "yup"; // 👈 Import Yup
import FlatButton from "../shared/FlatButton";
import { checkoutvalues } from "../shared/Types";
import { getNames } from "country-list";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


type checkprops = {
  handleCheckOut: (values: checkoutvalues) => void;
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

export default function Checkout({ handleCheckOut }: checkprops) {
  const countries = getNames();

  return (
    <section>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
        <Formik
          initialValues={{
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
          onSubmit={(values) => {
            handleCheckOut(values);
          }}
        >
          {(props) => (
            <div>
              <h3>Information</h3>
              <div style={styles.inputContainer}>
                <Input
                  name="name"
                  placeholder="Full name e.g: John Doe"
                  value={props.values.name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                {props.touched.name && props.errors.name && (
                  <div style={{ color: "red" }}>{props.errors.name}</div>
                )}
              </div>

              <div style={styles.inputContainer}>
                <Input
                  name="email"
                  placeholder="Email e.g: myname@email.com"
                  value={props.values.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                {props.touched.email && props.errors.email && (
                  <div style={{ color: "red" }}>{props.errors.email}</div>
                )}
              </div>

              <div style={styles.inputContainer}>
              <PhoneInput
                country={'ng'} // Default to Nigeria, or 'us' etc.
                onlyCountries={['ng', 'gh', 'us', 'gb']} // Optional: limit available countries
                value={props.values.phone}
                onChange={(value) => props.setFieldValue('phone', value)}
                onBlur={() => props.setFieldTouched('phone', true)}
                inputStyle={{ width: '100%' }}
                inputProps={{
                name: 'phone',
                required: true,
                autoFocus: false,
                }}
            />
            {props.touched.phone && props.errors.phone && (
                <div style={{ color: 'red' }}>{props.errors.phone}</div>
            )}
              </div>

              <h3>Delivery</h3>
              <div style={styles.inputContainer}>
                Country
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select your country"
                  optionFilterProp="children"
                  value={props.values.country}
                  onChange={(value) =>
                    props.setFieldValue("country", value)
                  }
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
                {props.touched.country && props.errors.country && (
                  <div style={{ color: "red" }}>{props.errors.country}</div>
                )}
              </div>

              <div style={styles.inputContainer}>
                <Input
                  name="address"
                  placeholder="Street/Address"
                  value={props.values.address}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                {props.touched.address && props.errors.address && (
                  <div style={{ color: "red" }}>{props.errors.address}</div>
                )}
              </div>

              <div style={styles.inputContainer}>
                <Input
                  name="city"
                  placeholder="City / Town"
                  value={props.values.city}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                {props.touched.city && props.errors.city && (
                  <div style={{ color: "red" }}>{props.errors.city}</div>
                )}
              </div>

              <div style={styles.inputContainer}>
                <Input
                  name="state"
                  placeholder="State"
                  value={props.values.state}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                {props.touched.state && props.errors.state && (
                  <div style={{ color: "red" }}>{props.errors.state}</div>
                )}
              </div>

              <div style={styles.inputContainer}>
                <Input.TextArea
                  name="deliveryNote"
                  placeholder="Delivery description (optional)"
                  value={props.values.deliveryNote}
                  onChange={props.handleChange}
                />
              </div>

              <div>
                <FlatButton title="Submit" onClick={props.handleSubmit} />
              </div>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
}
