import { Row, Form, Input, Checkbox, InputNumber, Col, Button, Space } from "antd";
import { useRouter } from "next/router";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24, Space
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },

};


const renderAttribute = (attribute) => {
    switch (attribute.type) {
        case "Boolean":
            return <Form.Item
                key={attribute.name}
                name={attribute.name}
                label={attribute.name}
                {...formItemLayout}
                style={{ width: "100%" }}
                valuePropName="checked"
            >
                <Checkbox style={{ width: "100%" }} />
            </Form.Item>
        case "Text":
            return <Form.Item
                key={attribute.name}
                name={attribute.name}
                label={attribute.name}
                {...formItemLayout}
                style={{ width: "100%" }}
            >
                <Input />
            </Form.Item>

        case "Number":
            return <Form.Item
                key={attribute.name}
                name={attribute.name}
                label={attribute.name}
                {...formItemLayout}
                style={{ width: "100%" }}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

        default:
            return <Form.Item
                key={attribute.name}
                name={attribute.name}
                label={attribute.name}
                {...formItemLayout}
                style={{ width: "100%" }}
            >
                <Input style={{ width: "100%" }} />
            </Form.Item>
    }
}

const renderInstance = (values, entity) => ({
    entity_name: entity.name,
    entity_id: entity._id,
    ...values
})

export default function Creation({ entity, instance }) {
    const router = useRouter()

    const onFinish = async (values) => {
        const url = instance ?
            `/api/instances/${entity._id}/${instance._id}` :
            `/api/instances/${entity._id}/instance`

        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(renderInstance(values, entity))
        })

        router.push("/instance/exploration")
    }

    const deleteInstance = async () => {
        await fetch(`/api/instances/${entity._id}/${instance._id}`, {
            method: "DELETE",
            body: JSON.stringify(instance)
        })
        router.push("/instance/exploration")
    }

    return <>
        <Row>
            <Col span={24}>
                <div style={{ width: "100%" }} >
                    <h2>{instance ? `Modify ${entity.name}` : `Create ${entity.name}`}</h2>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form name="Creation" onFinish={onFinish} autoComplete="off" initialValues={instance} >
                    <Form.Item key="_id" name="_id" hidden>
                        <Input />
                    </Form.Item>

                    {
                        entity.attributes.map(attribute => renderAttribute(attribute))

                    }
                    <Form.Item noStyle>
                        <Form.Item style={{ display: "inline-block", width: (instance ? "calc(50%)" : "100%") }}>
                            <Button type="primary" htmlType="submit" name="submit">
                                {instance ? "Update" : "Create"}
                            </Button>
                        </Form.Item>
                        {
                            instance ? (
                                <Form.Item style={{ display: "inline-block", width: "calc(50%)" }}>
                                    <Button type="danger" value="Delete" onClick={deleteInstance}>
                                        Delete
                                    </Button>
                                </Form.Item>) : undefined
                        }

                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </>

}