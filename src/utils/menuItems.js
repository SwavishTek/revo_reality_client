export const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Users",
    href: "/users",
    // children: [
    //   { label: "Active Users", href: "/users/active" },
    //   { label: "Inactive Users", href: "/users/inactive" },
    // ],
  },
  { label: "Leaves", href: "/leaves" },
  { label: "Attendance", href: "/attendance" },
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
