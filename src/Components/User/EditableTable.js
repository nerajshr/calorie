import React, { useEffect, useState} from "react";
import {Form, Input, InputNumber, Popconfirm, Tag, Table} from "antd";
import {EAccess, Accesses, ETables} from "../../EAccess";

const EditableContext = React.createContext();

function EditableCell(props) {
    const getInput = () => {
        if (props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    const renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    return (<EditableContext.Consumer>{renderCell}</EditableContext.Consumer>);
}

function EditableTable(props) {
    const tempData = {
        meal: [
            {
                key: '1',
                date: '12-12-12',
                time: '12:12',
                calorie: 1200,
                title: 'breakfast',
            },
            {
                key: '2',
                date: '12-12-12',
                time: '12:12',
                calorie: 1200,
                title: 'breakfast',
            },
        ],
        user: [
            {
                key:'1',
                name: 'Archit',
                userName : 'arch',
                password : '12345',
                access: 3,
                calorie: '2400'
            },
            {
                key:'2',
                name: 'Archit',
                userName : 'arch',
                password : '12345',
                access: 2,
                calorie: '2400'
            },
            {
                key:'3',
                name: 'Archit',
                userName : 'arch',
                password : '12345',
                access: 1,
                calorie: '2400'
            }
        ]
    };

    const columnSet ={
        meal: [
            {
                title: 'Date',
                dataIndex: 'date',
            },
            {
                title: 'Time',
                dataIndex: 'time',
            },
            {
                title: 'Calories',
                dataIndex: 'calorie',
                editable: true,
                inputType: 'number'
            },
            {
                title: 'Description',
                dataIndex: 'title',
                editable: true,
                inputType: 'string'
            },
            {
                title: '',
                dataIndex: '',
                render: (text, record) => {
                    if (isEditing(record)) {
                        console.log(record, ':',isEditing(record), editingKey);
                        return (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a onClick={() => save(form, record.key)} style={{marginRight: 8}} >
                                            Save
                                        </a>
                                    )}
                                </EditableContext.Consumer>
                                <a href=" " onClick={() => cancel(record.key)}>Cancel</a>
                            </span>
                        )
                    } else {
                        console.log(record, ':',isEditing(record), editingKey);
                        return (
                            <a onClick={() => edit(record.key)}>
                                Edit
                            </a>
                        );
                    }
                },
            },
            {
                title: '',
                dataIndex: '',

                render: (text, record) => {
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => del(record.key)}>
                            <a href=" ">Delete</a>
                        </Popconfirm>
                    );
                },
            },
        ],
        user: [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Username',
                dataIndex: 'userName',
            },
            {
                title: 'Password',
                dataIndex: 'password',
                editable: true,
                inputType: 'string'
            },
            {
                title: 'Access',
                dataIndex: 'access',
                editable: true,
                inputType: 'number',
                render: (access) => {
            let color;
            let accesses;
            switch (access) {
                case EAccess.USER : color = 'blue';
                    accesses = Accesses.USER;
                    break;
                case EAccess.MANAGER: color = 'green';
                    accesses = Accesses.MANAGER;
                    break;
                case EAccess.ADMIN: color = 'volcano';
                    accesses = Accesses.ADMIN;
                    break;
                default : color='black';
                    accesses = Accesses.ANONYMOUS;
            }
            return (
                <Tag color={color} key={access}>
                    {accesses}
                </Tag>
            );
        }
            },
            {
                title: 'Expected Calories(Per Day)',
                dataIndex: 'calorie',
                editable: true,
                inputType: 'number'
            },
            {
                title: '',
                dataIndex: '',
                render: (text, record) => {
                    if (isEditing(record)) {
                        console.log(record, ':',isEditing(record), editingKey);
                        return (
                            <span>
                                <EditableContext.Consumer>
                                    {form => (
                                        <a onClick={() => save(form, record.key)} style={{marginRight: 8}} >
                                            Save
                                        </a>
                                    )}
                                </EditableContext.Consumer>
                                <a onClick={() => cancel(record.key)}>Cancel</a>
                            </span>
                        )
                    } else {
                        console.log(record, ':',isEditing(record), editingKey);
                        return (
                            <a onClick={() => edit(record.key)}>
                                Edit
                            </a>
                        );
                    }
                },
            },
            {
                title: '',
                dataIndex: '',

                render: (text, record) => {
                    return (
                        <Popconfirm title="Sure to delete?" onConfirm={() => del(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    );
                },
            },
        ],
    };

    const [data, setData] = useState(tempData.meal);
    const [table, setTable] = useState(columnSet.meal);
    const [currentTable, setCurrentTable] = useState(ETables.MEAL);
    const [editingKey, setEditingKey] = useState();

    const isEditing = record => record.key === editingKey;

    const cancel = () => {
        setEditingKey(null);
    };

    useEffect(() => {
        console.log('editingKey changed',editingKey);
        if (currentTable === ETables.MEAL) {
            setTable(columnSet.meal);
        } else {
            setTable(columnSet.user);
        }
    }, [editingKey]);

    const edit = async (key) => {
        setEditingKey(key);
    };

    const save = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = data;
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey(null);
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey(null);
            }
        });
    };

    const del = (key) => {
        // TODO delete data
        setTable(columnSet.user);
        setData(tempData.user);
        setCurrentTable(ETables.USER);
        setEditingKey(null);
    };

    const components = {
        body: {
            cell: EditableCell,
        },
    };

    const columns = table.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                // inputType: col.dataIndex === 'calorie'||'access' ? 'number' : 'text',
                inputType: col.inputType,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <EditableContext.Provider value={props.form}>
            <Table
                components={components}
                bordered
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
                pagination={false}
            />
        </EditableContext.Provider>
    );
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;
