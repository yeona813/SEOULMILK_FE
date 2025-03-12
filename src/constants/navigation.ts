import File from "@/assets/icons/file.svg?react";
import FileSearch from "@/assets/icons/fileSearch.svg?react";
import Users from "@/assets/icons/users.svg?react";
import ListSearch from "@/assets/icons/listSearch.svg?react";
import AddUser from "@/assets/icons/addUser.svg?react";
import FileLock from "@/assets/icons/fileLock.svg?react";

export const navigationItems = [
  {
    text: "검증결과 조회",
    url: "/verify",
    icon: FileSearch,
    roles: ["headquarters"],
  },
  {
    text: "세금 계산서 제출",
    url: "/submit",
    icon: File,
    roles: ["dealership"],
  },
  {
    text: "사용자 등록",
    url: "/addUser",
    icon: AddUser,
    roles: ["admin"],
  },
  { text: "사용자 목록", url: "/users", icon: Users, roles: ["admin"] },
  {
    text: "계산서 통합 조회",
    url: "/adminHub",
    icon: ListSearch,
    roles: ["admin"],
  },
  {
    text: "공동인증서 등록",
    url: "/cert",
    icon: FileLock,
    roles: ["admin"],
  },
];
