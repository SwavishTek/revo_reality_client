import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import CardHeader from "../../components/CardHeader";
import { userHeaderItems } from "../../utils/menuItems";
import UserCard from "../../components/User/UserCard";
import { useUserQuery } from "../../Queries/user/userUserQuery";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import NoDataFound from "./components/NoDataFound";
import NoUserImage from "../../assets/NoUser.svg";
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";
import UserListItem from "./components/UserListItem";
import { changeUserStatus, userPermanantDelete } from "../../useFunctions/user/userFunctions";

const UserList = () => {
  const [userStatus, setUserStatus] = useState("new");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
    isFetching,
    refetch,
  } = useUserQuery({ status: userStatus, search });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "error") {
    return <Text>Error fetching data</Text>;
  }

  const allUsers = data?.pages?.flatMap((page) => page?.data || []) || [];

  const handleStatusChange = async ({ userId, newStatus }) => {
    try {
      const { data } = await changeUserStatus({ userId, status: newStatus });
      console.log(data);
      if (refetch) refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { data } = await userPermanantDelete({ userId });
      console.log(data);
      if (refetch) refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const navigateEdit = (userId) => {
    navigate(`/users/addEmployee?id=${userId}`);
  };

  return (
    <MyContainer
      header={'All Employees'}
      btnComponent={<>
        <CustomBtn
          title={'Offer Letters'}
          onClick={() => navigate('/users/offerletter')}
        />
        <CustomBtn
          bgColor={color.secondaryBtn}
          title={'Add Employee'}
          onClick={() => navigate('/users/addEmployee')} />
      </>}>
      <Filters onSearchChange={setSearch} />
      <CardHeader
        value={userStatus}
        items={userHeaderItems}
        onChange={setUserStatus}
      />
      <InfiniteScrollList
        containerStyle={{
          marginTop: '10px',
          paddingTop: '15px'
        }}
        data={allUsers || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isFetching={isFetching}
        renderItem={(item) => (
          <UserListItem
            item={item}
            onClickBox={() => navigate(`/users/${item?._id}`, { state: item })}
            onClickCheckbox={(v) => console.log('first checkBox', v)}
            onClickBtn={() => handleStatusChange({ newStatus: 'approved', userId: item?._id })}
            onClickEdit={navigateEdit}
            onClickDelete={deleteUser}
          />
        )}
        loadingMessage="Loading users..."
        errorMessage="Error fetching users"
        noDataMessage="No Users In The System"
      />
    </MyContainer>
  );
};

export default UserList;
