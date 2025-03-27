import { createContext, useState } from "react";

const UserDataContext = createContext();
const AgentDataContext = createContext();

const AdminDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [agentData, setAgentData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <AgentDataContext.Provider value={{ agentData, setAgentData }}>
        {children}
      </AgentDataContext.Provider>
    </UserDataContext.Provider>
  );
};

export { UserDataContext, AgentDataContext, AdminDataProvider };
