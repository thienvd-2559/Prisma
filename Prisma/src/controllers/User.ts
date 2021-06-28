import { UserServices } from "../services/UsersServices";

const Users = () => {
  const allUsers = UserServices();
  return allUsers;
};

export { Users };
