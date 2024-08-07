import React, { useEffect, useState, useMemo } from "react";
import { Box, VStack, Text, Button, Spinner } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

const InfiniteScrollList = ({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    renderItem,
    loadingMessage = "Loading...",
    errorMessage = "Error fetching data",
    noDataMessage = "No Data Found",
}) => {
    const { ref, inView } = useInView();
    const [listData, setListData] = useState(data);

    useEffect(() => {
        setListData(data);
    }, [data]);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const renderItems = useMemo(() => {
        return listData?.map((item, index) => (
            <Box key={item?._id || index}>{renderItem(item)}</Box>
        ));
    }, [listData, renderItem]);

    if (isLoading) {
        return (
            <VStack spacing={4} align="center">
                <Spinner />
                <Text>{loadingMessage}</Text>
            </VStack>
        );
    }

    return (
        <VStack spacing={4} align="stretch" width="100%" marginBottom={4}>
            {listData?.length > 0 ? (
                renderItems
            ) : (
                <Text>{noDataMessage}</Text>
            )}
            {isFetching && !isFetchingNextPage && (
                <VStack spacing={4} align="center">
                    <Spinner />
                    <Text>{loadingMessage}</Text>
                </VStack>
            )}
            <Box ref={ref}>
                {isFetchingNextPage ? (
                    <VStack spacing={4} align="center">
                        <Spinner />
                        <Text>Loading more...</Text>
                    </VStack>
                ) : null}
            </Box>
        </VStack>
    );
};

export default React.memo(InfiniteScrollList);
