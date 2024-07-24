import React from "react";
import CardActionButton from "../CardActionButton";
import {
  changeUserStatus,
  userPermanantDelete,
} from "../../useFunctions/user/userFunctions";
import { userStatusObj } from "../../utils/menuItems";
import Confirmation from "../Confirmation";
import { Image, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { WarningIcon } from "@chakra-ui/icons";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import DeleteUserIcon from "../../assets/deleteIcon.svg";
import Edit from "../../assets/Edit.svg";
import Check from "../../assets/Check_Mark.svg";
import Reject from "../../assets/Reject.svg";
import Deactive from "../../assets/Deactive.svg";
import Warning from "../../assets/Warning.svg";

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
            icon={<Image src={Warning} />}
          />
          <CardActionButton
            title="Approve"
            onClick={() => handleStatusChange(userStatusObj.approve)}
            icon={<Image src={Check} />}
          />
          <CardActionButton
            title="Reject"
            onClick={() => handleStatusChange(userStatusObj.reject)}
            icon={<Image src={Reject} />}
          />
        </>
      );
    case "draft":
      return (
        <>
          <Confirmation />
          <CardActionButton
            title="Edit"
            onClick={navigateEdit}
            icon={<Image src={Edit} />}
          />
          <CardActionButton
            title="Delete"
            onClick={onOpen}
            icon={<Image src={DeleteUserIcon} />}
          />
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
            icon={<Image src={Check} />}
          />
          <CardActionButton
            title="Reject"
            onClick={() => handleStatusChange(userStatusObj.reject)}
            icon={<Image src={Reject} />}
          />
        </>
      );
    case userStatusObj.approve:
      return (
        <>
          <CardActionButton
            title="Edit"
            onClick={navigateEdit}
            icon={<Image src={Edit} />}
          />
          <CardActionButton
            title="Deactivate"
            onClick={() => handleStatusChange(userStatusObj.deactive)}
            icon={<Image src={Deactive} />}
          />
          <CardActionButton
            title="Delete"
            onClick={onOpen}
            icon={<Image src={DeleteUserIcon} />}
          />
          <Confirmation
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={deleteUser}
          />
        </>
      );
    case "deactive":
      return (
        <>
          <CardActionButton
            title="Active"
            onClick={() => handleStatusChange(userStatusObj.approve)}
            icon={<Image src={Check} />}
          />
          <CardActionButton
            title="Delete"
            onClick={onOpen}
            icon={<Image src={DeleteUserIcon} />}
          />
          <Confirmation
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={deleteUser}
          />
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
