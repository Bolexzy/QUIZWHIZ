import React from 'react';
import { Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import { FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";


export default function Sidebar() {

    return (
        <Flex direction='column' alignItems='center' justifyContent='space-around' h='100%' py='7em'>
            <NavLink
                to="/dashboard" 
                end
            >
                {({ isActive, isPending }) => (
                    <IconButton
                        color={isActive ? 'red' : 'teal'}
                        border='0px'
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='50px'
                        icon={<BsFillHouseDoorFill />}
                    />
                )}
            </NavLink>
            <NavLink
                to="/dashboard/setting"
            >
                {({ isActive, isPending }) => (
                    <IconButton
                        color={isActive ? 'red' : 'teal'}
                        border='0px'
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='50px'
                        icon={<VscSettingsGear />}
                    />
                )}
            </NavLink>
            <NavLink
                to="/dashboard/takequiz"
            >
                {({ isActive, isPending }) => (
                    <IconButton
                        color={isActive ? 'red' : 'teal'}
                        border='0px'
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='50px'
                        icon={<FaHashtag />}
                    />
                )}
            </NavLink>
            <NavLink
                to="/dashboard/setquiz"
            >
                {({ isActive, isPending }) => (
                    <IconButton
                        color={isActive ? 'red' : 'teal'}
                        border='0px'
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='50px'
                        icon={<FaPlusCircle />}
                    />
                )}

            </NavLink>
        </Flex>
    );
}