import React, { FunctionComponent } from "react"
import { Card } from "semantic-ui-react"
import { Gnome } from "../models/Gnome";
import Tags from "./Tags";
interface Props {
    gnome : Gnome
    // onChangeMode: (mode: HierachyTypes) => void
};


const GnomeCard: FunctionComponent<Props> = (props: Props) => {

    const {name, age, hair_color, professions, height, weight} = props.gnome

    const renderSingleItem = (label: String, content: any, alignRight?: boolean) => {

        const getAlignClassName = () => {
            if (alignRight) return 'text-right '
            return 'text-left '
        }

        return (
            <div className='d-flex flex-column mb-2'>
                <div className={getAlignClassName() + 'font-weight-bold text-left'} style={{ fontSize: '12px' }}>
                    {label}
                </div>
                <div className={getAlignClassName()} style={{ fontSize: '12px' }}>
                    {content}
                </div>
            </div>
        )
    }

    return (
        <Card raised style={{ minHeight: 'fit-content', maxWidth: '300px', cursor: 'pointer', margin: '6px', borderRadius: '21px' }}
            // onClick={() => history.push(`/article?label=${props.type}&id=${props.id}`)}
        >
            <Card.Content>
                <Card.Header
                    style={{ fontSize: '15px', marginBottom: '4px' }}
                >
                   {name}
                </Card.Header>
                <Card.Meta className='text-left'>
                    <div className='text-left'>
                        {age}
                    </div>
                </Card.Meta>
                <Card.Description>
                    <div className='d-flex justify-content-between mx-2'>
                        {/* {renderSingleItem(FieldTypes.TITLE, 'nameeee')} */}
                        {renderSingleItem('Hair Color', hair_color)}
                        {renderSingleItem('Height', height)}
                        {renderSingleItem('Weight', weight)}
                    </div>
                    <Tags tags={professions} />
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default GnomeCard