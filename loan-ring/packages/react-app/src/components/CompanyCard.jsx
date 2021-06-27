import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { DollarOutlined, EllipsisOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

export default function CompanyCard({ data }) {
  const onClick = () => {};
  return (
    <div>
      <Card
        style={{ cursor: "pointer", margin: "10px" }}
        className="ant-card"
        cover={<img alt="example" className="card-image" src={data.img || defaultImage} />}
        actions={[
          <DollarOutlined key="purchase" onClick={onClick} />,
          <InfoCircleOutlined key="info" />,
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={data.userName}
          description={`${data.title}. Purchase or preview this stream.`}
        />
      </Card>
    </div>
  );
}
