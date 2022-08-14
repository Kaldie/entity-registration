import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Row, Col } from "antd";
import { useRouter } from "next/router"
const { TextArea } = Input;

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
    "Number"
]

const versionTypes = [
    "None", "Allow Versions",

]



export default function Creation({ entity }) {
    const router = useRouter()

    async function onFinish(values) {
        console.log("Received values of form:", values);
        await fetch(`/api/entities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        router.push("/entity/exploration")
    }

    async function deleteEntity(entity) {
        console.log("clicked delete entity", entity)
        await fetch(`/api/entities/${entity._id}`, {
            method: "DELETE",
            body: JSON.stringify(entity)
        })
        router.push("/entity/exploration")
    }

    function createInstance(stuff) {
        router.push(`/instance/${entity._id}/creation`)
        console.warn(stuff)
    }

    return (

        <>
            <Row align="middle">
                <div style={{ width: "100%" }}>
                    <h2>{entity ? "Modify Entity" : "Create Entity"}</h2>
                </div>
            </Row>
            <Form name="Creation" onFinish={onFinish} autoComplete="off" initialValues={entity}>

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