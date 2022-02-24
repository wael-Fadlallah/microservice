import axios from "axios";
import { ServiceResponseType } from "./../Types";

interface serviceResponse {
  serviceName: string;
  serviceVersion: string;
  servicePort: string;
  ip: string;
  timestamp: string;
}

export const getServiceUrl = async (
  serviceName: string,
  serviceVersion: string
) => {
  let serviceData = await axios.get<serviceResponse>(
    `http://localhost:5001/service/get/${serviceName}/${serviceVersion}`
  );
  const serviceObj: serviceResponse = serviceData.data;

  return serviceObj;
};

export const callService = async (
  serviceName: string,
  serviceVersion: string,
  packages: any
) => {
  const serviceObj: serviceResponse = await getServiceUrl(
    serviceName,
    serviceVersion
  );

  let serviceip = serviceObj.ip === "::1" ? "127.0.0.1" : serviceObj.ip;
  return await axios
    .post(`http://${serviceip}:${serviceObj.servicePort}`, {
      order: packages,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
