import {InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack} from '@chakra-ui/react'
import {selector, useRecoilState} from 'recoil'
import {selectedElementState} from './Canvas'
import {elementState, Element} from './components/Rectangle/Rectangle'

const selectedElementProperties = selector<Element | undefined>({
    key: 'selectedElementProperties',
    get: ({get}) => {
        const selectedElementId = get(selectedElementState)
        //Cannot be !selectedElementId because is value can be 0
        if (selectedElementId == null) {
            return
        }
        return get(elementState(selectedElementId))
    },
    set: ({get, set}, newElement) => {
        const selectedElementId = get(selectedElementState)
        if (selectedElementId == null) return
        if (!newElement) return
        set(elementState(selectedElementId), newElement)
    },
})

export const EditProperties = () => {
    const [element, setElement] = useRecoilState(selectedElementProperties)
    if (!element) return null
    const {left, top} = element.style.position
    const {width, height} = element.style.size
    const setPosition = (property: 'top' | 'left', value: number) => {
        setElement({
            ...element,
            style: {
                ...element.style,
                position: {
                    ...element.style.position,
                    [property]: value,
                },
            },
        })
    }
    const setSize = (property: 'width' | 'height', value: number) => {
        setElement({
            ...element,
            style: {
                ...element.style,
                size: {
                    ...element.style.size,
                    [property]: value,
                },
            },
        })
    }
    return (
        <Card>
            <Section heading="Position">
                <Property
                    label="Top"
                    value={top}
                    onChange={(top) => {
                        setPosition('top', top)
                    }}
                />
                <Property
                    label="Left"
                    value={left}
                    onChange={(left) => {
                        setPosition('left', left)
                    }}
                />
            </Section>
            <Section heading="Size">
                <Property
                    label="Width"
                    value={width}
                    onChange={(width) => {
                        setSize('width', width)
                    }}
                />
                <Property
                    label="Height"
                    value={height}
                    onChange={(height) => {
                        setSize('height', height)
                    }}
                />
            </Section>
        </Card>
    )
}

const Section: React.FC<{heading: string}> = ({heading, children}) => {
    return (
        <VStack spacing={2} align="flex-start">
            <Text fontWeight="500">{heading}</Text>
            {children}
        </VStack>
    )
}

const Property = ({label, value, onChange}: {label: string; value: number; onChange: (value: number) => void}) => {
    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={value} onChange={(_, value) => onChange(value)}>
                    <NumberInputField borderRadius="md" />
                    <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
                </NumberInput>
            </InputGroup>
        </div>
    )
}

const Card: React.FC = ({children}) => (
    <VStack
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="white"
        padding={2}
        boxShadow="md"
        borderRadius="md"
        spacing={3}
        align="flex-start"
        onClick={(e) => e.stopPropagation()}
    >
        {children}
    </VStack>
)
