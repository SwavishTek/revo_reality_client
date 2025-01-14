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

export const menuItemsAgent = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <TbTargetArrow size={"1.4rem"} />,
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

export const userNotificationItems = [
  {
    label: "New",
    value: "unseen",
    color: "#E9A80A",
  },
  {
    label: "Read",
    value: "seen",
    color: "#FF8A00",
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
  {
    label: "Cancelled",
    value: "cancelled",
    color: "#FF0000",
  },
];

export const attendanceHeaderItems = [
  {
    label: "Issues Raised",
    value: "issuesRaised",
    color: "#740707",
  },
  {
    label: "Present",
    value: "present",
    color: "#4ABC04",
  },
  {
    label: "Absent",
    value: "absent",
    color: "#FF0000",
  },
  {
    label: "On Leave",
    value: "onLeave",
    color: "#0095FF",
  },
  {
    label: "Half Day",
    value: "haffDay",
    color: "#FF8A00",
  },
];

export const userStatusObj = {
  approve: "approved",
  reject: "rejected",
  deactive: "deactive",
  active: "active",
  pending: "pending",
  cancelled: 'cancelled',
  revise:'revise'
};

export const leaveTypes = [
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Un Paid" },
];

export const userRoles = [
  // { value: "sup_admin", label: "Super Admin" },
  { value: "sub_admin", label: "Sub Admin" },
  { value: "manager", label: "Manager" },
  { value: "teamLead", label: "Team Lead" },
  { value: "agent", label: "Agent" },
];

export const userRolesObj = {
  sub_admin: "Sub Admin",
  manager: "Manager",
  teamLead: "Team Lead",
  agent: "Agent",
  sup_admin: "Super Admin",
};

export const adminArr = ["sup_admin", "sub_admin"];

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const options = [];

  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    options.push({ value: i.toString(), label: i.toString() });
  }

  return options;
};

export const regionOptions = [
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'south-america', label: 'South America' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
  // Add more regions as needed
];

export const monthOptions = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];