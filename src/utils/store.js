import uuid from "./uuid";

export const saveAndUpdate = (data = {}) => {
  let records = [];
  const existingData = window.localStorage.getItem("records");
  if (existingData !== null) {
    const parsedData = JSON.parse(existingData);
    records = parsedData || [];
  }
  const key = uuid();
  records.push({ key, ...data });
  window.localStorage.setItem("records", JSON.stringify(records));
};

export const getFeedbackRecords = () => {
  const existingData = window.localStorage.getItem("records");
  if (existingData !== null) {
    const parsedData = JSON.parse(existingData);
    return parsedData || [];
  }
  return [];
};
