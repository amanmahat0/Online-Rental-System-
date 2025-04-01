import { createContext, useState } from "react";

const UserDataContext = createContext();
const AgentDataContext = createContext();
const PropertiesDataContext = createContext();

const AdminDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [propertiesData, setPropertiesData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <AgentDataContext.Provider value={{ agentData, setAgentData }}>
        <PropertiesDataContext value={{ propertiesData, setPropertiesData }}>
          {children}
        </PropertiesDataContext>
      </AgentDataContext.Provider>
    </UserDataContext.Provider>
  );
};

export {
  UserDataContext,
  AgentDataContext,
  PropertiesDataContext,
  AdminDataProvider,
};
