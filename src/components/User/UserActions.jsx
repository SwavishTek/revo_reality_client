import React from "react";
import CardActionButton from "../CardActionButton";
import {
  changeUserStatus,
  userPermanantDelete,
} from "../../useFunctions/user/userFunctions";
import { userStatusObj } from "../../utils/menuItems";
import Confirmation from "../Confirmation";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserActions = ({ status = "draft", userId = "", refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleStatusChange = async (newStatus) => {
    try {
      const { data } = await changeUserStatus({ userId, status: newStatus });
      console.log(data);
      if (refetch) refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await userPermanantDelete({ userId });
      console.log(data);
      if (refetch) refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const navigateEdit = () => {
    navigate(`/users/addEmployee?id=${userId}`);
  };

  switch (status) {
    case "new":
      return (
        <>
          <CardActionButton
            title="Pending"
            onClick={() => handleStatusChange(userStatusObj.pending)}
          />
          <CardActionButton
            title="Approve"
            onClick={() => handleStatusChange(userStatusObj.approve)}
          />
          <CardActionButton
            title="Reject"
            onClick={() => handleStatusChange(userStatusObj.reject)}
          />
        </>
      );
    case "draft":
      return (
        <>
          <Confirmation />
          <CardActionButton title="Edit" onClick={navigateEdit} />
          <CardActionButton title="Delete" onClick={onOpen} />
          <Confirmation
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={deleteUser}
          />
        </>
      );
    case userStatusObj.pending:
      return (
        <>
          <CardActionButton
            title="Approve"
            onClick={() => handleStatusChange(userStatusObj.approve)}
          />
          <CardActionButton
            title="Reject"
            onClick={() => handleStatusChange(userStatusObj.reject)}
          />
        </>
      );
    case userStatusObj.approve:
      return (
        <>
          <CardActionButton title="Edit" onClick={navigateEdit} />
          <CardActionButton
            title="Deactivate"
            onClick={() => handleStatusChange(userStatusObj.deactive)}
          />
          <CardActionButton title="Delete" />
        </>
      );
    case "deactive":
      return (
        <>
          <CardActionButton
            title="Active"
            onClick={() => handleStatusChange(userStatusObj.approve)}
          />
          <CardActionButton title="Delete" />
        </>
      );

    default:
      return null;
  }

  //   return (
  //     <div>
  //       <CardActionButton title={"hii"} />
  //     </div>
  //   );
};

export default UserActions;
