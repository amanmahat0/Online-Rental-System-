import { createContext, useState } from "react";

const UserContext = createContext();
const RoleContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </RoleContext.Provider>
  );
};

export { UserContext, RoleContext, UserProvider };
