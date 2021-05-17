import React, { FunctionComponent } from "react"
import { Card } from "semantic-ui-react"
import { Gnome } from "../models/Gnome";

import Tags from "./Tags";
interface Props {
    gnome: Gnome
    // onChangeMode: (mode: HierachyTypes) => void
};


const GnomeCard: FunctionComponent<Props> = (props: Props) => {

    var math = require('lodash/math');


    const { name, age, hair_color, professions, height, weight, thumbnail } = props.gnome

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
            <Card.Content className='m-2'>
                <Card.Header
                    style={{ fontSize: '15px', marginBottom: '4px' }}
                >
                    {name}
                </Card.Header>
                <Card.Meta className='text-left'>
                    <div className='text-left'>
                        Age: {age}
                    </div>
                </Card.Meta>
                <Card.Description>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column justify-content-between'>
                            {/* {renderSingleItem(FieldTypes.TITLE, 'nameeee')} */}
                            {renderSingleItem('Hair Color', hair_color)}
                            {renderSingleItem('Height', math.round(height,2))}
                            {renderSingleItem('Weight', math.round(weight,2))}
                        </div>
                        <img src={thumbnail} style={{ width: '100px', height: 'stretch', borderRadius: '10px' }} />
                    </div>
                    <div className='mt-auto'>
                        <Tags tags={professions} />
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default GnomeCard