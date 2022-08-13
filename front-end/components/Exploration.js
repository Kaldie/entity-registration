import { Input, Cascader, List, Card } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import { filter_entities } from '../util/entities';

const { Search } = Input;


const searchOptions = [{
    value: "entity",
    label: "Entity",
    children: [
        {
            value: "all",
            label: "all"
        },
        {
            value: "name",
            label: "Name"
        },
        {
            value: "attribute.name",
            label: "Attribute"
        },
        {
            value: "domain.name",
            label: "Domain"
        },
        {
            value: "trait.name",
            label: "Trait"
        }
    ]
}]

let currentSearchOption



const onSearchTypeChange = (selected) => {
    currentSearchOption = selected
}


export default function Exploration({ data }) {
    let filtered_data = data
    const [newData, setNewData] = useState(filtered_data)

    const onSearch = (search_value) => {
        if (!search_value) {
            filtered_data = data
        } else {
            filtered_data = filter_entities(search_value, currentSearchOption, data)
        }
        setNewData(filtered_data)
    }

    return (
        <>
            <Search addonBefore={
                <Cascader
                    defaultValue={["entity"]}
                    onChange={onSearchTypeChange}
                    options={searchOptions}
                    placeholder="type"
                    style={{ width: 150 }} />}
                placeholder="input search text" onSearch={onSearch} size='large'
            />

            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={newData}
                renderItem={item => (
                    <List.Item>
                        <Link href={`/entity/${item._id}/modification`}>
                            <Card hoverable title={item.name}>Card content</Card>
                        </Link>
                    </List.Item>
                )}
            />


        </>
    );

}