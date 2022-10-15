import React, { useState, useEffect } from "react";
import { Input, Table, Button } from "antd";

import { getFeedbackRecords } from "../../utils/store";

const { Search } = Input;

const columns = [
  {
    title: "Customer Name",
    dataIndex: "name",
    key: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (value, record) => {
      return `(${record.country}) ${value}`;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Quality",
    dataIndex: "quality",
    key: "quality",
  },
  {
    title: "Beverage",
    dataIndex: "beverage",
    key: "beverage",
  },
  {
    title: "Cleanliness",
    dataIndex: "cleanliness",
    key: "cleanliness",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
];

const FeedbackTable = ({ setActiveKey }) => {
  const res = getFeedbackRecords();
  const [searchValue, setSearchValue] = useState("");
  const [dataSource, setDataSource] = useState(res);

  useEffect(() => {
    setDataSource(
      res.filter((row) => {
        return Object.values(row).some((el) =>
          `${el}`.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }, [searchValue]);

  return (
    <div className="feedback-table-container">
      <div className="feedback-table-header">
        <div>
          <h2>Aromatic Bar</h2>
          <p>
            {dataSource.length ? `${dataSource.length} records found` : null}
          </p>
        </div>
        <div className="feedback-table-header-cta">
          <Search
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <Button onClick={() => setActiveKey("feedback")} type="primary">
            Add new
          </Button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default FeedbackTable;
