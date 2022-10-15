import { useState } from "react";
import { Tabs } from "antd/lib";

import UserFeedback from "./components/UserFeedback";
import FeedbackTable from "./components/FeedbackTable";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  const [activeKey, setActiveKey] = useState("feedback");

  const items = [
    {
      key: "feedback",
      label: "Feedback Form",
      children: <UserFeedback />,
    },
    {
      key: "records",
      label: "Records",
      children: <FeedbackTable setActiveKey={setActiveKey} />,
    },
  ];

  return (
    <div className="app">
      <Tabs
        onChange={setActiveKey}
        activeKey={activeKey}
        destroyInactiveTabPane
        type="card"
        className="aromatic-tabs"
        items={items}
      />
    </div>
  );
}

export default App;
