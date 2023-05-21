import { Outlet } from "react-router-dom";
import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export default function Root() {
    return (
        <>
            <Flex>
                <Box bg='orange' w='7vw' h='100vw'>

                </Box>
                <Box w='100%'>
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