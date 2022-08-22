import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Row, Col } from "antd";
import { useRouter } from "next/router"
const { TextArea } = Input;

import { useState } from "react";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
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

const attributeTypes = [
    "Text",
    "Boolean",
    "Number",
    "Relation"
]

const versionTypes = [
    "None", "Allow Versions",
]



export default function Creation({ entity }) {
    const [form] = Form.useForm()
    const [entities, setEntities] = useState([])
    const router = useRouter()

    async function onFinish(values) {
        await fetch(`/api/entities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        router.push("/entity/exploration")
    }

    async function deleteEntity(entity) {
        await fetch(`/api/entities/${entity._id}`, {
            method: "DELETE",
            body: JSON.stringify(entity)
        })
        router.push("/entity/exploration")
    }

    async function getEntities() {
        if (entities.length !== 0) return
        const response = await fetch("/api/entities", {
            method: "GET",
        })
        const json = JSON.parse(await response.json())
        setEntities(json)
    }

    function createInstance() {
        router.push(`/instance/${entity._id}/creation`)
    }

    function getEntityOptions() {
        return entities.map(thisEntity =>
            <Select.Option key={thisEntity._id} value={thisEntity.name} entity={thisEntity}>
            </Select.Option>)
    }

    function getAttributeOptions(attributeIndex) {
        const attributes = form.getFieldValue("attributes")
        if (!attributes[attributeIndex].relation) return undefined
        const attributeEntity = entities.find(entity => entity._id === attributes[attributeIndex].relation.entity._id)
        if (attributeEntity) {
            return entity.attributes.map(entity_attribute =>
                <Select.Option key={entity_attribute.name} value={entity_attribute.name}>
                </Select.Option>
            )
        }
    }

    const onSearch = (values) => {
        console.log('Received values of form:', values);
    };

    const updateRelationProperties = (attributeIndex) => {
        return (_label, option) => {
            // Update the _id 
            const attributes = form.getFieldValue("attributes")
            attributes[attributeIndex].relation.entity._id = option.entity._id
            attributes[attributeIndex].relation.attribute = undefined
            form.setFieldsValue({ "attributes": attributes })
        }
    }

    return (

        <>
            <Row align="middle">
                <div style={{ width: "100%" }}>
                    <h2>{entity ? "Modify Entity" : "Create Entity"}</h2>
                </div>
            </Row>
            <Form form={form} name="Creation" onFinish={onFinish} autoComplete="off" initialValues={entity}>

                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Missing name" }]} {...formItemLayout}>
                    <Input />
                </Form.Item>

                <Form.Item name="_id" hidden>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Description" {...formItemLayout}>
                    <TextArea rows={2} placeholder="Description" />
                </Form.Item>

                <Form.List name="attributes" >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Form.Item
                                    key={[field.key, "top"]}
                                    label="Attribute"
                                    {...formItemLayout}
                                    style={{ margin: "0" }}
                                >
                                    <Form.Item
                                        key={[field.key, "name"]}
                                        name={[field.name, "name"]}
                                        rules={[{ required: true, message: "Missing attribute name" }]}
                                        style={{ display: "inline-block", width: "calc(50% - 16px)" }}
                                    >
                                        <Input placeholder="name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label=""
                                        key={[field.key, "type"]}
                                        name={[field.name, "type"]}
                                        rules={[{ required: true, message: "Missing type" }]}
                                        style={{ display: "inline-block", width: "calc(25% - 16px)", margin: "0 8px" }}
                                    >
                                        <Select placeholder="type">
                                            {(attributeTypes.map(item => (
                                                <Select.Option key={item} value={item}>
                                                    {item}
                                                </Select.Option>
                                            )))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label=""
                                        key={[field.key, "version"]}
                                        name={[field.name, "version"]}
                                        rules={[{ required: true, message: "Missing " }]}
                                        style={{ display: "inline-block", width: "calc(25% - 16px)", margin: "0 8px" }}
                                    >
                                        <Select placeholder="version strategy">
                                            {(versionTypes.map(item => (
                                                <Select.Option key={item} value={item}>
                                                    {item}
                                                </Select.Option>
                                            )))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item noStyle key={[field.key, "minus"]}>
                                        <MinusCircleOutlined key={[field.key, "minus"]} onClick={() => remove(field.name)} />
                                    </Form.Item>

                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, currentValues) =>
                                            currentValues.attributes[field.name] &&
                                            (
                                                !prevValues.attributes[field.name] ||
                                                prevValues.attributes[field.name].type !== currentValues.attributes[field.name].type
                                            )
                                        }
                                    >
                                        {({ getFieldValue }) => {
                                            const currentAttribute = getFieldValue('attributes')[field.name]

                                            if (!currentAttribute || currentAttribute.type === undefined) return null

                                            if (currentAttribute.type === "Relation") getEntities()

                                            return currentAttribute.type === "Relation" ?
                                                <Form.Item noStyle>
                                                    <Form.Item
                                                        hidden
                                                        key={[field.name, "relation", "entity", "_id"]}
                                                        name={[field.name, "relation", "entity", "_id"]}
                                                    ><Input /></Form.Item>
                                                    <Form.Item
                                                        key={[field.name, "relation", "entity", "name"]}
                                                        name={[field.name, "relation", "entity", "name"]}
                                                        style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                                                    >
                                                        <Select
                                                            showSearch
                                                            placeholder="Select a entity"
                                                            onChange={updateRelationProperties(field.name)}
                                                            onSearch={onSearch}
                                                        >
                                                            {getEntityOptions()}
                                                        </Select>

                                                    </Form.Item>
                                                    <Form.Item
                                                        key={[field.name, "relation", "attribute"]}
                                                        name={[field.name, "relation", "attribute"]}
                                                        style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }}
                                                    >
                                                        <Select
                                                            mode="multiple"
                                                            placeholder="Select Attribute"
                                                        >
                                                            {getAttributeOptions(field.name)}
                                                        </Select>

                                                    </Form.Item>
                                                </Form.Item>
                                                : null


                                        }}
                                    </Form.Item>

                                    <Form.Item
                                        {...field}
                                        key={[field.key, "description"]}
                                        name={[field.name, "description"]}
                                    >
                                        <TextArea rows={2} placeholder="Description" />
                                    </Form.Item>

                                </Form.Item>
                            ))}


                            <Form.Item >
                                <Button onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add attributes
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List >
                <Form.Item noStyle>
                    <Form.Item
                        {...(entity ? { style: { display: "inline-block", width: "calc(33%)" } } : {})}>
                        <Button type="primary" htmlType="submit" name="submit" value="Update">
                            {entity ? "Update" : "Create"}
                        </Button>
                    </Form.Item>
                    {
                        entity ?
                            <>
                                <Form.Item
                                    style={{ display: "inline-block", width: "calc(33%)" }}>
                                    <Button type="dashed" onClick={() => createInstance(entity)}>
                                        Create instance
                                    </Button>
                                </Form.Item>

                                <Form.Item
                                    style={{ display: "inline-block", width: "calc(33%)" }}>
                                    <Button type="danger" onClick={() => deleteEntity(entity)}>
                                        Delete
                                    </Button>
                                </Form.Item>

                            </>
                            : <></>
                    }
                </Form.Item>
            </Form >
        </>
    );
};