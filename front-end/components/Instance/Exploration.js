import { AutoComplete, Input, Col, Row, List, Card, Space } from "antd"
import Link from "next/link"
import { useState } from "react";

export default function Exploration({ entities, _initialEntity }) {

    const allOptions = entities ? entities.map(entity => ({
        value: entity.name,
        entity_id: entity._id
    })) : [];


    const [state, setState] = useState({
        instances: [],
        selectedEntity: undefined
    });


    const onSelect = async (_data, option) => {
        const response = await fetch(`/api/instances/${option.entity_id}/instance`, {
            method: "GET",
        })

        response.json().then(json_response => {
            const instances = json_response.instances
            setState({
                instances,
                selectedEntity: instances.length > 0 ? entities.find(entity => option.entity_id === entity._id) : undefined
            })
        })

    }

    return (
        <>
            <Row align="middle">
                <Col span={2}>Search Entity:</Col>
                <Col span={22}>
                    <AutoComplete
                        backfill
                        options={allOptions}
                        filterOption={(value, option) => option.value.toLowerCase().includes(value.toLowerCase())}
                        style={{
                            width: "100%",
                        }}
                        onSelect={onSelect}
                    >
                        <Input.Search size="large" placeholder="input here" enterButton />
                    </AutoComplete>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }} dataSource={state.instances}
                        renderItem={item => (
                            <List.Item key={item._id}>
                                <Link href={`/instance/${state.selectedEntity._id}/${item._id}/creation`}>
                                    <Card hoverable>
                                        {
                                            state.selectedEntity.attributes.map(attribute =>
                                                <Row>
                                                    <Col>
                                                        {attribute.name}: {item[attribute.name]}
                                                    </Col>
                                                </Row>
                                            )}

                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
};


