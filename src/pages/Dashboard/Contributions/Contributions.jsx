import { Tabs } from '@arco-design/web-react';

// importing styles
import "./Contributions.css"

// importing custom components
import Header from "../../../components/Header/Header"
import Sidebar from "../../../components/Sidebar/Sidebar"
import ListPlaces from './Places List/PlacesList';
import ContributePlaces from './Add Places/ContributePlaces';

const TabPane = Tabs.TabPane;

const Contributions = ({data}) => {
    return(
      <div className="main-body">
        <Header />
        <div className="dashboard-content contributions">
          <Sidebar data={data} />
          <div className="content">
            <div className="url-path">Dashboard / Contribute</div>
            <div className="profile-section">
              <div className="profile-content">
                <div className="contributed-places-wrapper">
                    <Tabs defaultActiveTab='contributed_places' style={{width: '100%'}}>
                        <TabPane key='contributed_places' title='Places Contributed'>
                            <ListPlaces />
                        </TabPane>

                        <TabPane key='contribute' title='Contribute'>
                            <ContributePlaces />
                        </TabPane>
                    </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Contributions;