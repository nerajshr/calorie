import {Button, PageHeader} from "antd";
import React from "react";


function CalorieHeader(){
    return(
    <PageHeader
        title="Calorie Counter"
        style={{
            border: '1px solid rgb(235, 237, 240)',
        }}
        extra={
            <Button key="1" type="primary">
                LogIn
            </Button>
        }
    >
    </PageHeader>
    );

}

export default CalorieHeader;