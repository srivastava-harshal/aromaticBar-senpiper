import React, { useState, useEffect } from "react";

import { Form, Input, Checkbox, InputNumber, Button, Select } from "antd";

import { CheckOutlined } from "@ant-design/icons";

import { saveAndUpdate } from "../../utils/store";

// const options = [
//   { key: "india", text: "India", value: "+91" },
//   { key: "usa", text: "USA", value: "+44" },
//   { key: "uk", text: "UK", value: "+33" },
// ];

const { Option } = Select;

const options = [
  { label: "Bad", value: "bad" },
  { label: "Fair", value: "fair" },
  { label: "Good", value: "good" },
  { label: "Excellent", value: "excellent" },
];

const initialData = {
  name: "",
  email: "",
  country: "+91",
  phone: "",
  quality: "",
  beverage: "",
  cleanliness: "",
  experience: "",
};

const validateEmail = (email = "") => {
  if (!email) return "Email is required";
  const isValidEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return isValidEmail ? "" : "Enter a valid email";
};

const validatePhone = (phone = "") => {
  if (!phone) return "Phone is required";
  const isValidPhoneNumber = `${phone}`.length === 10;
  return isValidPhoneNumber ? "" : "Enter a valid phone";
};

const UserFeedback = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleChange = (key, value) => {
    // check to limit mobile number as antD max prop wasnt working
    if (key === "phone" && `${value}`.length > 10) return;
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const validate = () => {
    const obj = {};
    const { email, phone } = data;
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        obj[key] = `${key} is a required field`;
      }
    });
    obj.email = !!obj.email ? obj.email : validateEmail(email);
    obj.phone = !!obj.phone ? obj.phone : validatePhone(phone);
    setErrors({ ...obj });
    return !Object.values(obj).some((e) => e);
  };

  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      saveAndUpdate(data);
      setSuccess(true);
      setData(initialData);
    }
  };

  if (success) {
    return (
      <div className="feedback-success">
        <CheckOutlined />
        <h4>Thank you for providing the feedback</h4>
        <p>We will work towards improving your experience</p>
        <div>
          <Button type="primary" onClick={() => setSuccess(false)}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  const selectCountry = (
    <Select
      defaultValue="+91"
      style={{
        width: 80,
      }}
      value={data.country}
      onChange={(e) => handleChange("country", e)}
    >
      <Option value="+91">
        <img src="https://img.icons8.com/office/30/000000/india--v2.png" />
      </Option>
      <Option value="+1">
        <img src="https://img.icons8.com/office/30/40C057/usa.png" />
      </Option>
    </Select>
  );

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>Aromatic Bar</h2>
        <p>
          We are committed to providing you with the best dining experience
          possible, so we welcome your comments. Please fill out this
          questionnaire. Thank you!
        </p>
      </div>
      <Form layout="vertical" className="feedback-form">
        <div className="section-left">
          <Form.Item
            required
            label="Customer Name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name}
          >
            <Input
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Name"
            />
          </Form.Item>
          <Form.Item
            required
            label="Phone"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone}
          >
            <Input
              // controls={false}
              type="number"
              addonBefore={selectCountry}
              style={{ width: "100%" }}
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="9999999999"
            />
          </Form.Item>
          <Form.Item
            required
            label="Please rate the quality of the service you recieved from your host"
            validateStatus={errors.quality ? "error" : ""}
            help={errors.quality}
          >
            <Checkbox.Group
              value={data.quality}
              options={options}
              onChange={(e) => handleChange("quality", e.pop())}
            />
          </Form.Item>
          <Form.Item
            required
            label="Was our restaurant clean?"
            validateStatus={errors.cleanliness ? "error" : ""}
            help={errors.cleanliness}
          >
            <Checkbox.Group
              value={data.cleanliness}
              options={options}
              onChange={(e) => handleChange("cleanliness", e.pop())}
            />
          </Form.Item>
        </div>
        <div className="section-right">
          <Form.Item
            required
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
            style={{ marginBottom: "120px" }}
          >
            <Input
              value={data.email}
              placeholder="Enter email"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            required
            label="Please rate the quality of your beverage"
            validateStatus={errors.beverage ? "error" : ""}
            help={errors.beverage}
          >
            <Checkbox.Group
              value={data.beverage}
              options={options}
              onChange={(e) => handleChange("beverage", e.pop())}
            />
          </Form.Item>
          <Form.Item
            required
            label="Please rate yoru overall dining experience"
            validateStatus={errors.experience ? "error" : ""}
            help={errors.experience}
          >
            <Checkbox.Group
              value={data.experience}
              options={options}
              onChange={(e) => handleChange("experience", e.pop())}
            />
          </Form.Item>
        </div>
      </Form>
      <Button type="primary" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default UserFeedback;
