import { createContext, useState } from "react";

const UserDataContext = createContext();
const AgentDataContext = createContext();
const PropertiesDataContext = createContext();
const OwnerDataContext = createContext();

const AdminDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [propertiesData, setPropertiesData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <AgentDataContext.Provider value={{ agentData, setAgentData }}>
        <PropertiesDataContext value={{ propertiesData, setPropertiesData }}>
          <OwnerDataContext value={{ ownerData, setOwnerData }}>
            {children}
          </OwnerDataContext>
        </PropertiesDataContext>
      </AgentDataContext.Provider>
    </UserDataContext.Provider>
  );
};

export {
  UserDataContext,
  AgentDataContext,
  PropertiesDataContext,
  OwnerDataContext,
  AdminDataProvider,
};
