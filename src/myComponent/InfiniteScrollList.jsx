import React, { useEffect } from "react";
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

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <VStack spacing={4} align="center">
                <Spinner />
                <Text>{loadingMessage}</Text>
            </VStack>
        );
    }

    return (
        <VStack spacing={6} align="stretch" width="100%">
            {data?.length > 0 ? (
                data.map((item, index) => <Box key={item?._id || index}>{renderItem(item)}</Box>)
            ) : (
                <Text>{noDataMessage}</Text>
            )}
            {/* {isFetching && !isFetchingNextPage && (
                <VStack spacing={4} align="center">
                    <Spinner />
                    <Text>{loadingMessage}</Text>
                </VStack>
            )} */}
            <Box ref={ref}>
                {isFetchingNextPage ? (
                    <VStack spacing={4} align="center">
                        <Spinner />
                        <Text>Jav Loading more...</Text>
                    </VStack>
                ) : null}
            </Box>
        </VStack>
    );
};

export default InfiniteScrollList;
