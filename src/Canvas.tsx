import {atom, useRecoilValue, useSetRecoilState} from 'recoil'
import {Rectangle} from './components/Rectangle/Rectangle'
import {EditProperties} from './EditProperties'
import {PageContainer} from './PageContainer'
import {Toolbar} from './Toolbar'

export const selectedElementState = atom<number | null>({
    key: 'selectedElement',
    default: null,
})

export const elementsState = atom<number[]>({
    key: 'elements',
    default: [],
})

function Canvas() {
    const elements = useRecoilValue(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementState)

    return (
        <PageContainer
            onClick={() => {
                setSelectedElement(null)
            }}
        >
            <Toolbar />
            <EditProperties />
            {elements.map((id) => (
                <Rectangle key={id} id={id} />
            ))}
        </PageContainer>
    )
}

export default Canvas
