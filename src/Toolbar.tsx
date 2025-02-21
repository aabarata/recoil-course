import {Icon, IconButton, VStack} from '@chakra-ui/react'
import {elementsState} from './Canvas'
import {Square} from 'react-feather'
import {useSetRecoilState} from 'recoil'

export const Toolbar = () => {
    const setElements = useSetRecoilState(elementsState)

    return (
        <VStack
            position="absolute"
            top="20px"
            left="20px"
            backgroundColor="white"
            padding={2}
            boxShadow="md"
            borderRadius="md"
            spacing={2}
        >
            <IconButton
                onClick={() => {
                    setElements((elements) => [...elements, elements.length])
                }}
                aria-label="Add rectangle"
                icon={<Icon style={{width: 24, height: 24}} as={Square} />}
            />
        </VStack>
    )
}
