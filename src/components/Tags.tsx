import { FunctionComponent } from "react"
import { Label } from "semantic-ui-react"

interface Props {
    tags: any
};


const Tags: FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            {!props.tags.map &&
                <Label style={{ backgroundColor: '#ff3550', color :'white', height: 'min-content', marginRight: '8px' }}>
                    {props.tags}
                </Label>
            }
            {props.tags.map &&
                props.tags.map((item: any) => (
                    <Label  style={{backgroundColor: '#ff3550',color :'white', height: 'min-content', marginRight: '8px', marginTop: '5px' }}>
                        {item}
                    </Label>
                ))
            }
        </>

    )
}

export default Tags
