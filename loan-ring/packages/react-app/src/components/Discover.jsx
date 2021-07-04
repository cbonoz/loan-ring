import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Modal from "antd/lib/modal/Modal";
import { Badge } from "antd";

import { Input } from "antd";
import CompanyCard from "./CompanyCard";
import { EXAMPLE_CARDS } from "../util";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd/lib/radio";

function Discover({ companies, setCompanies, onReady }) {
  const [cards, setCards] = useState(EXAMPLE_CARDS);
  const [query, setQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState({});

  useEffect(() => {
    if (!query) {
      setCards(EXAMPLE_CARDS);
      return;
    }

    const fuse = new Fuse(cards, {
      keys: ["title", "description"],
    });

    const results = fuse.search(query);
    const items = results.map(character => character.item);
    setCards(items);
  }, [query]);

  const ids = new Set(companies.map(x => x.id));

  return (
    <div className="content">
      <h2>
        Discover Projects{" "}
        <Badge count={companies.length} onClick={onReady}>
          <ShoppingCartOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
        </Badge>
        <Button className="float-right" disabled={!companies.length} onClick={onReady}>
          Continue
        </Button>
      </h2>
      <Input
        addonBefore={"Search"}
        placeholder="Enter company name"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <br />
      {cards.map((x, i) => {
        const isSelected = ids.has(x.id);
        return (
          <span className="cursor-pointer" key={i}>
            <CompanyCard isSelected={isSelected} data={x} onClick={x => setCompanies([...companies, x])} />
          </span>
        );
      })}
      <Modal title="Success" visible={isModalVisible} onOk={() => setIsModalVisible(false)}>
        <h5>Purchased item: </h5>
        <p>{purchasedItem.title}</p>
        <p>Access key: {purchasedItem.key}</p>

        <hr />
        <p>Write these down, you will not be shown them again.</p>
      </Modal>
    </div>
  );
}

export default Discover;
