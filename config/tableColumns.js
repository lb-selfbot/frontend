import { UserActionButton } from "../components/dbactions/UserActionButton";
import { KeyActionButton } from "../components/dbactions/KeyActionButton";
import { OrderActionButton } from "../components/dbactions/OrderActionButton";
import { DeleteReleaseButton } from "../components/dbactions/DeleteReleaseButton";

const usersColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "loginData",
    headerName: "Login data",
    width: 300,
  },
  {
    field: "key",
    headerName: "Key",
    width: 200,
  },
  {
    field: "accountType",
    headerName: "Account type",
    width: 150,
  },
  {
    field: "flags",
    headerName: "Flags",
    description: "User flags: staff, tester, etc.",
    sortable: false,
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 160,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    width: 140,
    renderCell: (params) => {
      return <UserActionButton gridCellParams={params} />;
    },
  },
];

const onlineUsersColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 250,
  },
  {
    field: "key",
    headerName: "Key",
    width: 200,
  },
  {
    field: "accountType",
    headerName: "Account type",
    width: 150,
  },
  {
    field: "loggedInAt",
    headerName: "Logged in at",
    width: 160,
  },
  {
    field: "loginData",
    headerName: "Login data",
    width: 300,
  },
  {
    field: "lastPingAt",
    headerName: "Last ping at",
    width: 160,
  },
];

const keysColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "key",
    headerName: "Key",
    width: 200,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 170,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 160,
  },
  {
    field: "createReason",
    headerName: "Create Reason",
    width: 250,
  },
  {
    field: "redeemedBy",
    headerName: "Redeemed By",
    width: 200,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    width: 140,
    renderCell: (params) => {
      return <KeyActionButton gridCellParams={params} />;
    },
  },
];

const ordersColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "user",
    headerName: "User",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 170,
  },
  {
    field: "orderId",
    headerName: "Order ID",
    width: 200,
  },
  {
    field: "key",
    headerName: "Key",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 160,
  },
  {
    field: "rawJson",
    headerName: "Raw JSON",
    width: 300,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    width: 140,
    renderCell: (params) => {
      return <OrderActionButton gridCellParams={params} />;
    },
  },
];

const releasesColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "branch",
    headerName: "Branch",
    width: 125,
  },
  {
    field: "version",
    headerName: "Version",
    width: 125,
  },
  {
    field: "changelog",
    headerName: "Changelog",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    width: 140,
    renderCell: (params) => {
      return <DeleteReleaseButton gridCellParams={params} />;
    },
  },
];

export {
  usersColumns,
  onlineUsersColumns,
  keysColumns,
  ordersColumns,
  releasesColumns,
};
