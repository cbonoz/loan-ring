import React, { useState } from "react";
import faker from "faker";
import { Card, Avatar } from "antd";
import {
  CheckCircleTwoTone,
  DollarOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";
import ReactPlayer from "react-player";

const { Meta } = Card;

const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

export default function CompanyCard({ data, onClick, isSelected }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const viewInfo = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => setIsModalVisible(false);
  const description = (data.categories || []).join(",");
  const avatarUrl = data.thumbURL || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

  const ToggleComponent = PlusCircleOutlined; // isSelected ? CheckCircleTwoTone : PlusCircleOutlined;
  return (
    <Card
      style={{ cursor: "pointer", margin: "10px" }}
      className="ant-card"
      cover={<img alt="example" className="card-image" src={data.img || data.imgURL || defaultImage} />}
      actions={[
        <ToggleComponent key="toggle" onClick={() => onClick(data)} />,
        <InfoCircleOutlined key="info" onClick={viewInfo} />,
      ]}
    >
      <Meta avatar={<Avatar src={avatarUrl} />} title={data.title} description={description} />

      <Modal title={data.title} visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
        <p>{data.description}</p>
        <p>This project was added on on {(data.createdAt || faker.date.recent()).toLocaleDateString()}.</p>
        {data.videoURL && <ReactPlayer url={data.videoURL} width="100%" height="100%" controls={true} />}
      </Modal>
    </Card>
  );
}
