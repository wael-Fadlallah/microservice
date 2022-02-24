import { useState, ChangeEvent, useEffect } from "react";
import { callService } from "./services/axios";
import "./index.css";
import { ServiceResponseType } from "./Types";

function App() {
  const [packages, setPackages] = useState<Array<PackageType>>([]);
  const [item, setItem] = useState<PackageType>(defaultPackage);
  const [serviceResponse, setServiceResponse] = useState<ServiceResponseType>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const addToOrder = () => {
    setPackages((prev) => [...prev, item]);
    setItem(defaultPackage);
  };

  const handleCalcSize = async () => {
    const result = await callService("volumetric-weight", "1.0.0", packages);
    setServiceResponse(result);
  };
  return (
    <div className="m-10">
      <h1 className="text-center mb-8">
        Just a simple layout for demonstration purposes{" "}
      </h1>
      <ul>
        {packages.map((item: PackageType, index: number) => (
          <li key={index}>
            Package #{item.id} weight {item.weight}kg height {item.height}cm
            length {item.length}cm
          </li>
        ))}

        {serviceResponse && (
          <ul className="m-4">
            <span>Service response</span>
            <li>will fit: {serviceResponse.willFit ? "true" : "false"}</li>
            <li>Order volumetric weight : {serviceResponse.packagesSize}</li>
            <li>Suggested box siz: {serviceResponse.randomBoxSize}</li>
          </ul>
        )}

        {packages.length > 0 && (
          <button
            className="bg-gray-900 p-1 m-2 text-white"
            onClick={handleCalcSize}
          >
            Calculate box size
          </button>
        )}
      </ul>

      <div className="my-4">
        <input
          type="text"
          name="id"
          value={item.id}
          onChange={(e) => handleChange(e)}
          placeholder="Enter package id"
        />
        <input
          type="text"
          name="weight"
          value={item.weight}
          onChange={(e) => handleChange(e)}
          placeholder="Enter package weight"
        />
        <input
          type="number"
          name="height"
          value={item.height}
          onChange={(e) => handleChange(e)}
          placeholder="Enter package height"
        />
        <input
          type="number"
          name="length"
          value={item.length}
          onChange={(e) => handleChange(e)}
          placeholder="Enter package length"
        />
        <button className="bg-gray-900 p-1 m-2 text-white" onClick={addToOrder}>
          Add to order
        </button>
      </div>
    </div>
  );
}

interface PackageType {
  id: string;
  weight: string;
  height: string;
  length: string;
}

const defaultPackage = {
  id: "",
  weight: "",
  height: "",
  length: "",
};
export default App;
