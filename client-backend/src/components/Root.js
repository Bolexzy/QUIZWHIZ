import React from 'react';
import { Outlet } from "react-router-dom";
import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';

export default function Root() {
    return (
        <>
            <Flex>
                <Box bg='orange' w='6em' h='100%' pos='fixed'>
                    <Sidebar />
                </Box>
                <Box w='100%' ml='6em'>
                    <Flex direction='column'>
                        <Box bg='grey' h='5vw' w='100%'>

                        </Box>
                        <Box>
                        <Outlet />
                        </Box>

                    </Flex>
                </Box>
            </Flex>

        </>
    );
}