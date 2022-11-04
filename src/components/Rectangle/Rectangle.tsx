import {useRecoilState, atomFamily} from 'recoil'
import {selectedElementState} from '../../Canvas'
import {Drag} from '../Drag'
import {Resize} from '../Resize'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {style: ElementStyle}

//Will create one atom for each element (individual instances),
//so the changes will be restraint to single the atom and not trigger the others
export const elementState = atomFamily<Element, number>({
    key: 'element',
    default: {
        style: {
            position: {top: 50, left: 50},
            size: {width: 100, height: 100},
        },
    },
})

export const Rectangle = ({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)
    const [element, setElement] = useRecoilState(elementState(id))

    const selected = id === selectedElement

    return (
        <RectangleContainer
            position={element.style.position}
            size={element.style.size}
            onSelect={() => {
                setSelectedElement(id)
            }}
        >
            <Resize
                selected={selected}
                position={element.style.position}
                size={element.style.size}
                onResize={(style) => {
                    setElement({...element, style})
                }}
            >
                <Drag
                    position={element.style.position}
                    onDrag={(position) => {
                        setElement({
                            style: {
                                ...element.style,
                                position,
                            },
                        })
                    }}
                >
                    <div>
                        <RectangleInner selected={selected} />
                    </div>
                </Drag>
            </Resize>
        </RectangleContainer>
    )
}
