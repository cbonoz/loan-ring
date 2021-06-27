import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import CompanyCard from "./CompanyCard";
import { EXAMPLE_CARDS } from "../util";

function Discover(props) {
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
      keys: ["name", "description"],
    });

    const results = fuse.search(query);
    const items = results.map(character => character.item);
    setCards(items);
  }, [query]);

  return (
    <div className="content">
      <h2>Discover Projects</h2>
      <Input
        addonBefore={"Search"}
        placeholder="Enter company name"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <br />
      {cards.map((x, i) => {
        return (
          <span key={i}>
            <CompanyCard data={x} />
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
