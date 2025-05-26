import { Table, Modal, Divider, Typography, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { UseContextData } from "../../../Context/UseContextData";
import { OrderHooks } from "../../Hooks/OrderHooks";
import FlatButton from "../../../shared/FlatButton";
import { CartItem } from "../../../shared/Types";

const { Title, Text } = Typography;

export const Order = () => {
  const { order } = UseContextData();
  const { getColumnSearchProps, handleRowClick, selectedRow,setIsModalVisible, isModalVisible, } = OrderHooks();
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
      render: (text: string) => `${text.slice(0, 7)}...`,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Message",
      dataIndex: "email",
      key: "email",
      render: () => <MailOutlined />,
      ...getColumnSearchProps("email"),
    },
  ];

  return (
    <>
      <Table
        dataSource={order || []}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRow && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Customer Info */}
            <div>
              <Title level={5}>Customer Info</Title>
              <Text>
                <strong>Name:</strong> {selectedRow.name}
              </Text>
              <br />
              <Text>
                <strong>Email:</strong> {selectedRow.email}
              </Text>
              <br />
              <Text>
                <strong>Order ID:</strong> {selectedRow.id}
              </Text>
            </div>

            <Divider />

            {/* Products */}
            <div>
              <Title level={5}>Ordered Products</Title>
              {selectedRow.cart.map((cart: CartItem, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: "12px",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Text strong>{cart.title}</Text>
                <div>
                <Text>Unit Price:</Text> ₦{Number(cart.price).toLocaleString()}
                </div>
                <div>
                <Text>Quantity:</Text> {cart.quantity}
                </div>
                <div>
                <Text>Total:</Text> ₦{(cart.price * cart.quantity).toLocaleString()}
                </div>

                </div>
              ))}
            </div>

            <Text>
                <strong>Total Price:</strong> ₦{selectedRow.totalPrice}
            </Text>

            <Divider />

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <FlatButton
                onClick={() => {}}
                className="btn-success"
                title="Settled"
              />
              <FlatButton
                onClick={() => {}}
                className="btn-outline-success"
                title="Request Delivery"
              />
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
};
