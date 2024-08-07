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
import NoDataFound from "./components/NoDataFound"; // Import the ImageWithText component
import NoUserImage from "../../assets/NoUser.svg"; // Import the image
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";
import UserListItem from "./components/UserListItem";

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

  return (

    <MyContainer
      header={'All Employees'}
      btnComponent={<>
        <CustomBtn
          title={'Offer Letters'}
          onClick={() => navigate('/users/offerletter')}
        />
        <CustomBtn
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
          paddingTop:'15px'
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
            onClickCheckbox={(v) => console.log('firscheckBox', v)}
          />
        )}
        loadingMessage="Loading users..."
        errorMessage="Error fetching users"
        noDataMessage="No Users In The System"
      />

    </MyContainer>




    /* <VStack spacing={4} align="stretch" height="100vh" p={4}>
       <Box>
         <Header title="All Employees">
           <Button colorScheme="brand" onClick={() => navigate('/users/offerletter')}>
             Offer Letters
           </Button>
           <Button colorScheme="brand" onClick={() => navigate('/users/addEmployee')}>
             Add Employee
           </Button>
           
         </Header>
         <Filters onSearchChange={setSearch} />
         <CardHeader
           value={userStatus}
           items={userHeaderItems}
           onChange={setUserStatus}
         />
         <Box maxHeight="70vh" py={4} my={4} overflowY="auto">
           {allUsers.length > 0 ? (
             <VStack spacing={4} align="stretch">
               {allUsers.map((item) => (
                 <UserCard item={item} key={item._id} refetch={refetch} />
               ))}
             </VStack>
           ) : status === "pending" ? (
             <Text>Loading...</Text>
           ) : (
             <NoDataFound
               name={'NoUser'}
               message="No Users In The System"
             />
           )}
           <Box ref={ref}>
             {isFetchingNextPage ? (
               <Text>Loading more...</Text>
             ) : (
               hasNextPage && (
                 <Button onClick={() => fetchNextPage()}>Load More</Button>
               )
             )}
           </Box>
         </Box>
       </Box>
     </VStack> */
  );
};

export default UserList;
