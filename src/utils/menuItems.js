import { TbTargetArrow } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { MdHub } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";

export const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <TbTargetArrow size={"1.4rem"} />,
  },
  {
    label: "Users",
    href: "/users",
    icon: <FaUser size={"1.4rem"} />,
    // children: [
    //   { label: "Active Users", href: "/users/active" },
    //   { label: "Inactive Users", href: "/users/inactive" },
    // ],,
  },
  {
    label: "Teams",
    href: "/teams",
    icon: <MdHub size={"1.4rem"} />,
  },
  {
    label: "Leaves",
    href: "/leaves",
    icon: <FaCalendarCheck size={"1.4rem"} />,
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: <TiDocumentText size={"1.4rem"} />,
  },
];

export const userHeaderItems = [
  {
    label: "New",
    value: "new",
    color: "#E9A80A",
  },
  {
    label: "Draft",
    value: "draft",
    color: "#FF8A00",
  },
  {
    label: "Pending",
    value: "pending",
    color: "#0095FF",
  },
  {
    label: "Approved / Active",
    value: "approved",
    color: "#4ABC04",
  },
  {
    label: "Rejected",
    value: "rejected",
    color: "#FF0000",
  },
  {
    label: "Deactivated",
    value: "deactive",
    color: "#740707",
  },
];
export const leaveHeaderItems = [
  {
    label: "New",
    value: "new",
    color: "#E9A80A",
  },
  {
    label: "On Hold",
    value: "onHold",
    color: "#FF8A00",
  },
  {
    label: "Revise",
    value: "revise",
    color: "#0095FF",
  },
  {
    label: "Approved",
    value: "approved",
    color: "#4ABC04",
  },
  {
    label: "Rejected",
    value: "rejected",
    color: "#FF0000",
  },
];

export const userStatusObj = {
  approve: "approved",
  reject: "rejected",
  deactive: "deactive",
  active: "active",
  pending: "pending",
};

export const leaveTypes = [
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Un Paid" },
];
