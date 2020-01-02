import React from 'react';
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import CalorieHeader from "./Components/PageHeader";
import CalorieSideBar from "./Components/User/SideBar";
import CalorieContentHeader from "./Components/User/ContentHeader";
import CalorieContentTable from "./Components/User/ContentTable";
const { Header, Content } = Layout;


function App(){

  return(
      <div>
        <CalorieHeader/>
        <Layout>
          <CalorieSideBar/>
          <Layout>
            <Header>
              <CalorieContentHeader/>
            </Header>

            <Content>
              <CalorieContentTable/>
            </Content>
          </Layout>

        </Layout>
      </div>
  );
}

export default App;


//
// function onChange(value, dateString) {
//   console.log('Selected Time: ', value);
//   console.log('Formatted Selected Time: ', dateString);
// }
//
// function onOk(value) {
//   console.log('onOk: ', value);
// }