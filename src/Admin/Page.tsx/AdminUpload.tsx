import {
  Form,
  Input,
  Row,
  Col,
  Pagination,
  Typography,
  message,
  Popconfirm,
  Empty,
  Upload,
  Button,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UploadFileStorage } from "../Hooks/UploadHooks";
import { addDoc } from "firebase/firestore";
import { productRef } from "../../App";
import FlatButton from "../../shared/FlatButton";
import { UseContextData } from "../../Context/UseContextData";
import type { UploadFile } from "antd/es/upload/interface";
import { productType } from "../../shared/Types";

const { Title, Paragraph } = Typography;



export const AdminUpload: React.FC = () => {
  const { uploadFilesToStorage, handleFilesDelete } = UploadFileStorage();
  const { product } = UseContextData();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = product
    ? product.slice(startIndex, startIndex + pageSize)
    : [];

  const beforeUpload = (file: UploadFile) => {
    const isImage = file.type?.startsWith("image/");
    const isUnder2MB = (file.size || 0) / 1024 / 1024 <= 2;
    const totalFiles = fileList.length + 1;

    if (!isImage) {
      message.error("Only image files are allowed.");
      return Upload.LIST_IGNORE;
    }

    if (!isUnder2MB) {
      message.error(`${file.name} is larger than 2MB.`);
      return Upload.LIST_IGNORE;
    }

    if (totalFiles > 10) {
      message.error("You can only upload up to 10 files.");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleFileChange = (info: any) => {
    const validFiles = info.fileList.filter(
      (file: UploadFile) => file.type?.startsWith("image/")
    );
    setFileList(validFiles);

    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const formik = useFormik({
    initialValues: {
    title: "",
    measurement: 0,
    price: 0,
    },
    validationSchema: Yup.object({
    title: Yup.string().required("Title is required"),
    measurement: Yup.number()
        .required("Measurement is required")
        .positive("Measurement must be a positive number"),
    price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      let filesData: { url: string; imagePath: string }[] = [];

      try {
        if (fileList.length > 0) {
          filesData = await uploadFilesToStorage(fileList);
        }

        const newProduct: productType = {
          title: values.title,
          price: values.price,
          measurement: values.measurement,
          fileUrls: filesData,
        };

        await addDoc(productRef, newProduct);
        message.success("Product added successfully!");
        resetForm();
        setFileList([]);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section>
      <div className="container-fluid">
        <div style={{ padding: "20px 0" }}>
          <h2>Upload New Product</h2>
        </div>

        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Title"
            validateStatus={formik.errors.title && formik.touched.title ? "error" : ""}
            help={formik.touched.title && formik.errors.title}
          >
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter title"
            />
          </Form.Item>

          <Form.Item
            label="Measurement"
            validateStatus={formik.errors.measurement && formik.touched.measurement ? "error" : ""}
            help={formik.touched.measurement && formik.errors.measurement}
            >
            <InputNumber
                name="measurement"
                value={formik.values.measurement}
                onChange={(value) => formik.setFieldValue("measurement", value)}
                onBlur={formik.handleBlur}
                min={0}
                placeholder="Enter measurement"
                style={{ width: "100%" }}
            />
          </Form.Item>


          <Form.Item
            label="Price"
            validateStatus={formik.errors.price && formik.touched.price ? "error" : ""}
            help={formik.touched.price && formik.errors.price}
          >
            <InputNumber
              name="price"
              value={formik.values.price}
              onChange={(value) => formik.setFieldValue("price", value)}
              onBlur={formik.handleBlur}
              min={0}
              placeholder="Enter price"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Upload Images">
            <Upload.Dragger
              accept="image/*"
              multiple
              maxCount={10}
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={beforeUpload}
              showUploadList
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Drag or Click to Upload</Button>
            </Upload.Dragger>
          </Form.Item>

          <FlatButton
            onClick={formik.handleSubmit}
            title="Submit"
            disable={loading}
            className='btn-success'
          />
        </Form>

        <div style={{ marginTop: "3rem" }}>
          <h2>Products</h2>
          {product && product.length > 0 ? (
            <>
              <Row gutter={[16, 24]}>
                {paginatedProducts.map((prod: productType, index) => (
                  <Col key={index} lg={8} md={12} sm={24}>
                    <Title level={4} style={{ marginTop: "1rem" }}>
                      {prod.title}
                    </Title>
                    <Paragraph>₦{prod.price}</Paragraph>
                    <Paragraph>{prod.measurement}</Paragraph>

                    <Popconfirm
                      title="Are you sure you want to delete this event?"
                      onConfirm={() => handleFilesDelete(prod, prod.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span>
                        <FlatButton
                          className="buttondark"
                          title="Delete Event"
                          onClick={() => {}}
                        />
                      </span>
                    </Popconfirm>
                  </Col>
                ))}
              </Row>

              {product.length > pageSize && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={product.length}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          ) : (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <Empty description="This is where all products will be listed" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
