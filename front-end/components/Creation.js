import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';

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
    async function onFinish(values) {
        console.log('Received values of form:', values);
        fetch(`/api/entities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
    }

    return (
        <Form name="Creation" onFinish={onFinish} autoComplete="off" initialValues={entity}>

            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Missing name' }]} {...formItemLayout}>
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
                                key={[field.key, 'top']}
                                label="Attribute"
                                {...formItemLayout}
                                style={{ margin: '0' }}
                            >
                                <Form.Item
                                    key={[field.key, 'name']}
                                    name={[field.name, 'name']}
                                    rules={[{ required: true, message: 'Missing attribute name' }]}
                                    style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
                                >
                                    <Input placeholder='name' />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label=""
                                    key={[field.key, 'type']}
                                    name={[field.name, 'type']}
                                    rules={[{ required: true, message: 'Missing type' }]}
                                    style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                                >
                                    <Select placeholder='type'>
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
                                    key={[field.key, 'version']}
                                    name={[field.name, 'version']}
                                    rules={[{ required: true, message: 'Missing ' }]}
                                    style={{ display: 'inline-block', width: 'calc(25% - 16px)', margin: '0 8px' }}
                                >
                                    <Select placeholder='version strategy'>
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
                                    key={[field.key, 'description']}
                                    name={[field.name, 'description']}
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};