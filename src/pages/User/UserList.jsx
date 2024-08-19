import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import CardHeader from '../../components/CardHeader';
import { userHeaderItems } from '../../utils/menuItems';
import { useUserQuery } from '../../Queries/user/userUserQuery';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import MyContainer from '../../myComponent/MyContainer';
import { CustomBtn } from '../../myComponent/CustomBtn';
import { color } from '../../consts/color';
import InfiniteScrollList from '../../myComponent/InfiniteScrollList';
import UserListItem from './components/UserListItem';
import { changeUserStatus, userPermanantDelete } from '../../useFunctions/user/userFunctions';
import Confirmation from '../../components/Confirmation';
import { userStatusObj } from '../../utils/menuItems'; // Import the status object
import { useDisclosure } from '@chakra-ui/react'; // Ensure this is imported

const UserList = () => {
  const [userStatus, setUserStatus] = useState('new');
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]); // Maintain local state for users
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Destructure useDisclosure
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading, isFetching, refetch } = useUserQuery({ status: userStatus, search });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const allUsers = data.pages.flatMap(page => page.data || []);
      setUsers(allUsers);
    }
  }, [data]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'error') {
    return <Text>Error fetching data</Text>;
  }

  const handleStatusChange = async ({ userId, newStatus }) => {
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
      if (selectedUserId) {
        await userPermanantDelete({ userId: selectedUserId });
        setUsers(prevUsers => prevUsers.filter(user => user._id !== selectedUserId));
        onClose();  
      }
    } catch (err) {
      console.log(err);
      
    }
  };

  const navigateEdit = (userId) => {
    navigate(`/users/addEmployee?id=${userId}`);
  };

  const handleButtonClick = (event, action, ...params) => {
    event.stopPropagation();  
    action(...params);
  };

  return (
    <MyContainer
      header={'All Employees'}
      btnComponent={<>
        <CustomBtn
          bgColor={color.secondaryBtn}
          title={'Offer Letter List'}
          onClick={() => navigate('/users/offerletterlist')} />
        <CustomBtn
          title={'Offer Letters'}
          onClick={() => navigate('/users/offerletter')}
        />
        <CustomBtn
          bgColor={color.secondaryBtn}
          title={'Add Employee'}
          onClick={() => navigate('/users/addEmployee')} />
      </>
      }
    >
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
        data={users} 
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
            onClickEdit={(e) => handleButtonClick(e, () => navigateEdit(item?._id))}
            onClickDelete={(e) => {
              handleButtonClick(e, () => {
                setSelectedUserId(item?._id);  
                onOpen(); 
              });
            }}
            onClickActivate={(e) => handleButtonClick(e, () => handleStatusChange({ newStatus: 'approved', userId: item?._id }))}
            onClickApprove={(e) => handleButtonClick(e, () => handleStatusChange({ newStatus: 'approved', userId: item?._id }))}
            onClickDeactivate={(e) => handleButtonClick(e, () => handleStatusChange({ newStatus: 'deactive', userId: item?._id }))}
            onClickPending={(e) => handleButtonClick(e, () => handleStatusChange({ newStatus: 'pending', userId: item?._id }))}
            onClickReject={(e) => handleButtonClick(e, () => handleStatusChange({ newStatus: 'rejected', userId: item?._id }))}
          />
        )}
        loadingMessage="Loading users..."
        errorMessage="Error fetching users"
        noDataMessage="No Users In The System"
      />
      <Confirmation
        line1="Are you sure you want to delete"
        line2="the user"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={deleteUser}
      />
    </MyContainer>
  );
};

export default UserList;
